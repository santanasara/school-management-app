import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { Matricula } from 'src/matricula/entities/matricula.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotaService {

  constructor(
    @InjectRepository(Nota)
    private notaRepository: Repository<Nota>,
  ) {}

  create(createNotaDto: CreateNotaDto) {
  
    let nota = this.notaRepository.create(createNotaDto);
    nota.data_lancamento = new Date();
    
    return this.notaRepository.save(nota);
  }

  findAll() {
    return `This action returns all nota`;
  }


  async findOne(id: number) {
    const nota = await this.notaRepository.findOneBy({ id })
    if (!nota) throw new NotFoundException('Matricula não encontrado');
          return nota;
  }

  update(id: number, updateNotaDto: UpdateNotaDto) {
    return `This action updates a #${id} nota`;
  }

  async remove(id: number) {
      const nota = await this.findOne(id);
      await this.notaRepository.remove(nota);
  }
}
