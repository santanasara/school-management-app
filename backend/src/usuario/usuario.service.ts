import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  create(createUsuarioDto: CreateUsuarioDto) {
    return {};
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return {};
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return {};
  }

  remove(id: number) {
    return {};
  }
}
