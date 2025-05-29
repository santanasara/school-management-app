import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Matricula } from './entities/matricula.entity';
import { Repository } from 'typeorm';
import { SituacaoMatricula } from './entities/SituacaoMatricula';
import { Turma } from 'src/turma/entities/turma.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class MatriculaService {
  constructor(
      @InjectRepository(Matricula)
      private matriculaRepository: Repository<Matricula>,
      @InjectRepository(Turma)
      private readonly turmaRepository: Repository<Turma>,
      @InjectRepository(Usuario)
      private readonly usuarioRepository: Repository<Usuario>,
    ) {}
  
    async create(createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {

      const turma = await this.turmaRepository.findOneBy({ id: createMatriculaDto.turmaId });
      if (!turma) {
        throw new NotFoundException('Turma não encontrada');
      }

      const usuario = await this.usuarioRepository.findOneBy({ id: createMatriculaDto.usuarioId });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      const dataMatricula = new Date()

      const matricula = this.matriculaRepository.create({turma,usuario,dataMatricula});

      return this.matriculaRepository.save(matricula);
    }
  
    async findAll(): Promise<Matricula[]> {
      return this.matriculaRepository.find();
    }
  
    async findOne(id: number): Promise<Matricula> {
      const matricula = await this.matriculaRepository.findOneBy({ id });
      if (!matricula) throw new NotFoundException('Matricula não encontrado');
      return matricula;
    }
  
    async findAtivos(): Promise<Matricula[]> {
      return this.matriculaRepository.find({ where: { situacaoMatricula: SituacaoMatricula.ATIVA } });
    }
  
    async findByNome(nome: string): Promise<Matricula[]> {
      return this.matriculaRepository.createQueryBuilder('matricula')
        .leftJoinAndSelect('matricula.turma', 'turma')
        .leftJoinAndSelect('turma.disciplina', 'disciplina')
        .where("1 = 1")
        .andWhere('LOWER(disciplina.nome) LIKE %LOWER(:nome)%', { nome: `%${nome}%` }).getMany()
    }
  
    async findByCargaHorariaMinima(min: number): Promise<Matricula[]> {
      return this.matriculaRepository
        .createQueryBuilder('matricula')
        .where('matricula.cargaHoraria > :min', { min })
        .getMany();
    }
  
    async update(id: number, updateMatriculaDto: UpdateMatriculaDto): Promise<Matricula> {
      const matricula = await this.matriculaRepository.preload({
        id,
        ...updateMatriculaDto,
      });
      if (!matricula) throw new NotFoundException('Matricula não encontrado');
      return this.matriculaRepository.save(matricula);
    }
  
    async remove(id: number): Promise<void> {
      const matricula = await this.findOne(id);
      await this.matriculaRepository.remove(matricula);
    }

    async listarMatriculasPorTurma(id:number){
      return this.matriculaRepository.find({
        where: { turma: { id:id } },
      });
    }
}
