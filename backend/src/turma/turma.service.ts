import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from './entities/turma.entity';

@Injectable()
export class TurmaService {

  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
  ) {}
  
  create(createTurmaDto: CreateTurmaDto) {
    const novaTurma = this.turmaRepository.create(createTurmaDto);
    return this.turmaRepository.save(novaTurma);
  }

  findAll() {
    return this.turmaRepository.find();
  }

  findOne(id: number) {
    return this.turmaRepository.findOneBy({ id });
  }

  update(id: number, updateTurmaDto: UpdateTurmaDto) {
    return this.turmaRepository.update(id, updateTurmaDto);
  }

  remove(id: number) {
    return this.turmaRepository.delete(id);
  }
}
