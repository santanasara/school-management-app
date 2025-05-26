import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(curso);
  }

  async findAll(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOneBy({ id });
    if (!curso) throw new NotFoundException('Curso não encontrado');
    return curso;
  }

  async findAtivos(): Promise<Curso[]> {
    return this.cursoRepository.find({ where: { status: true } });
  }

  async findByNome(nome: string): Promise<Curso[]> {
    return this.cursoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  }

  async findByCargaHorariaMinima(min: number): Promise<Curso[]> {
    return this.cursoRepository
      .createQueryBuilder('curso')
      .where('curso.cargaHoraria > :min', { min })
      .getMany();
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.cursoRepository.preload({
      id,
      ...updateCursoDto,
    });
    if (!curso) throw new NotFoundException('Curso não encontrado');
    return this.cursoRepository.save(curso);
  }

  async remove(id: number): Promise<void> {
    const curso = await this.findOne(id);
    await this.cursoRepository.remove(curso);
  }


}
