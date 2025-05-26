import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoaService {
  create(createPessoaDto: CreatePessoaDto) {
    return {};
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return {};
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return {};
  }

  remove(id: number) {
    return {};
  }
}
