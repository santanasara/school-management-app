import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return await this.pessoaRepository.save(pessoa);
  }

  async findAll(): Promise<Pessoa[]> {
    return await this.pessoaRepository.find();
  }

  async findOne(id: number): Promise<Pessoa | null> {
    return await this.pessoaRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa | null> {
    await this.pessoaRepository.update(id, updatePessoaDto);
    return await this.pessoaRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.pessoaRepository.delete(id);
  }
}
