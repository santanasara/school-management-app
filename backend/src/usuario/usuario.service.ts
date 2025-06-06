import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const pessoa = { id: createUsuarioDto.pessoaId }
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
      pessoa,
    });

    return await this.usuarioRepository.save(usuario);
  }

  async listarProfessores() {
    return await this.usuarioRepository.find({ relations: ['pessoa'], where: { perfil: 'prof' } });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ relations: ['pessoa', 'matriculas'] });
  }

  async findOne(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { id },
      relations: ['pessoa', 'matriculas'],
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario | null> {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return await this.usuarioRepository.findOne({ where: { id }, relations: ['pessoa', 'matriculas'] });
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async findByLogin(login: string): Promise<Usuario | null> {
    return await this.usuarioRepository
    .createQueryBuilder('usuario')
    .addSelect('usuario.senha') // inclui o campo senha explicitamente
    .leftJoinAndSelect('usuario.pessoa', 'pessoa')
    .where('usuario.login = :login', { login })
    .getOne();
  }
}
