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
    ) {}
  
    async create(createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
      let matricula = this.matriculaRepository.create(createMatriculaDto);

      matricula.usuario = { id: 2 } as Usuario;
      
      return this.matriculaRepository.save(matricula);
    }
  
    async findAll(): Promise<Matricula[]> {
      return this.matriculaRepository.find();
    }
  
    async findOne(id: number): Promise<Matricula> {
      const matricula = await this.matriculaRepository.findOne({ 
        where: { id },
        relations: ['usuario', 'usuario.pessoa', 'notas'],
      });
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
        .andWhere('(LOWER(disciplina.nome) LIKE LOWER(:nome) OR LOWER (turma.nome) LIKE LOWER(:nome))', { nome: `%${nome}%` }).getMany()
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
}
