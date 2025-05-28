import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usuarioService.findByLogin(login);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (isPasswordValid) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.login, 
      sub: user.id,
      perfil: user.perfil 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        login: user.login,
        perfil: user.perfil,
      }
    };
  }
}