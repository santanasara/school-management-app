import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Turma } from 'src/turma/entities/turma.entity';
import { Repository } from 'typeorm';
import { Atividade } from './entities/atividade.entity';

@Injectable()
export class AtividadeService {

  constructor(
    @InjectRepository(Turma)
    private readonly turmaRepository: Repository<Turma>,
    
    @InjectRepository(Atividade)
    private readonly atividadeRepository: Repository<Atividade>, 

  ) {}
  
  async create(dto: CreateAtividadeDto) {
    const turma = await this.turmaRepository.findOneBy({ id: dto.turmaId });
    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    const atividade = this.atividadeRepository.create({
      ...dto,
      turma,
      dataInicial: new Date(dto.dataInicial),
      dataFinal: new Date(dto.dataFinal),
    });

    return this.atividadeRepository.save(atividade);
  }

  findAll() {
    return this.atividadeRepository.find();
  }

  async findOne(id: number) {
    const atividade = await this.atividadeRepository.findOneBy({id});
    if (!atividade) {
      throw new NotFoundException('Atividade não encontrada');
    }
    return atividade;
  }

  async update(id: number, dto: UpdateAtividadeDto) {
    const atividade = await this.findOne(id);

    if (dto.turmaId) {
      const turma = await this.turmaRepository.findOneBy({ id: dto.turmaId });
      if (!turma) {
        throw new NotFoundException('Turma não encontrada');
      }
      atividade.turma = turma;
    }

    Object.assign(atividade, {
      ...dto,
      dataInicial: dto.dataInicial ? new Date(dto.dataInicial) : atividade.dataInicial,
      dataFinal: dto.dataFinal ? new Date(dto.dataFinal) : atividade.dataFinal,
    });

    return this.atividadeRepository.save(atividade);
  }

  async remove(id: number) {
    return await this.atividadeRepository.delete(id);
  }

  async listarAtividadesPorTurma(id:number){
    return this.atividadeRepository.find({
      where: { turma: { id:id } },
    });
  }
}
