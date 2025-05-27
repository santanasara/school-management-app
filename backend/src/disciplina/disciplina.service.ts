import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disciplina } from './entities/disciplina.entity';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectRepository(Disciplina)
    private readonly disciplinaRepository: Repository<Disciplina>,
  ) {}

  async create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    const disciplina = this.disciplinaRepository.create(createDisciplinaDto);
    return await this.disciplinaRepository.save(disciplina);
  }

  async findAll(): Promise<Disciplina[]> {
    return await this.disciplinaRepository.find({
      relations: ['turma'], // carrega as turmas associadas
    });
  }

  async findOne(id: number): Promise<Disciplina> {
    const disciplina = await this.disciplinaRepository.findOne({
      where: { id },
      relations: ['turma'], // opcional
    });

    if (!disciplina) {
      throw new NotFoundException(`Disciplina com id ${id} não encontrada`);
    }

    return disciplina;
  }

  async update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): Promise<Disciplina> {
    const disciplina = await this.findOne(id);
    const updated = Object.assign(disciplina, updateDisciplinaDto);
    return await this.disciplinaRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const disciplina = await this.findOne(id);
    await this.disciplinaRepository.remove(disciplina);
  }

  async findByLocal(local: string): Promise<Disciplina[]> {
    return await this.disciplinaRepository
      .createQueryBuilder('disciplina')
      .leftJoinAndSelect('disciplina.turma', 'turma')
      .where('turma.local = :local', { local })
      .getMany();
  }

  async findByInstrutor(instrutorId: number): Promise<Disciplina[]> {
    return await this.disciplinaRepository
      .createQueryBuilder('disciplina')
      .leftJoinAndSelect('disciplina.turma', 'turma')
      .where('turma.instrutorId = :instrutorId', { instrutorId })
      .getMany();
  }

  async findByNome(nome: string): Promise<Disciplina[]> {
    return await this.disciplinaRepository
      .createQueryBuilder('disciplina')
      .leftJoinAndSelect('disciplina.turma', 'turma')
      .where('disciplina.nome ILIKE :nome', { nome: `%${nome}%` })
      .getMany();
  }
}
