import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { AtividadeService } from 'src/atividade/atividade.service';
import { MatriculaService } from 'src/matricula/matricula.service';

@Injectable()
export class TurmaService {

  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
    
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,

    private readonly atividadeService:AtividadeService,

    private readonly matriculaService: MatriculaService,
  ) {}
  
  async create(dto: CreateTurmaDto) {
    let instrutor: Usuario | null = null;
    if (dto.instrutorId) {
      instrutor = await this.usuarioRepository.findOneBy({ id: dto.instrutorId,  perfil: 'prof' as const });
      if (!instrutor) {
        throw new NotFoundException('Instrutor não encontrado');
      }
    }

    let disciplina: Disciplina | null = null;
    if (dto.disciplinaId) {
      disciplina = await this.disciplinaRepository.findOneBy({ id: dto.disciplinaId });
      if (!disciplina) {
        throw new NotFoundException('Disciplina não encontrada');
      }
    }

    const turma = this.turmaRepository.create({
      ...dto,
      instrutor,
      disciplina,
      dataInicial: new Date(dto.dataInicial),
      dataFinal: new Date(dto.dataFinal),
    });

    return this.turmaRepository.save(turma);
  }

  findAll() {
    return this.turmaRepository.find({
      relations: ['disciplina', 'instrutor'],
    });
  }

  async findOne(id: number) {

    const turma = await this.turmaRepository.findOne({
      where: { id },
      relations: ['disciplina', 'instrutor', 'matriculas'],
    });
    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }
    return turma;
  }

  async update(id: number, dto: UpdateTurmaDto) {
    
    const turma = await this.findOne(id);

    if(!dto.instrutorId){
      turma.instrutor = null;
    }else{
      turma.instrutor = await this.usuarioRepository.findOneBy({ id: dto.instrutorId });
      if(!turma.instrutor){
        throw new NotFoundException('Instrutor não encontrado');
      }
    }

    if(!dto.disciplinaId){
      turma.disciplina = null;
    }else{
      turma.disciplina = await this.disciplinaRepository.findOneBy({ id: dto.disciplinaId });
      if(!turma.disciplina){
        throw new NotFoundException('Disciplina não encontrada');
      }
    }

    Object.assign(turma, {
      ...dto,
      dataInicial: dto.dataInicial ? new Date(dto.dataInicial) : turma.dataInicial,
      dataFinal: dto.dataFinal ? new Date(dto.dataFinal) : turma.dataFinal,
    });

    return this.turmaRepository.save(turma);
  }

  async remove(id: number) {
    return await this.turmaRepository.delete(id);
  }

  async listarAtividades(id:number){
    return await this.atividadeService.listarAtividadesPorTurma(id);
  }

  async listarMatriculas(id:number){
    return await this.matriculaService.listarMatriculasPorTurma(id)
  }
}
