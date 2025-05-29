import { IsString, IsNotEmpty, IsInt, } from 'class-validator';
import { Perfil } from '../entities/usuario.entity';

export class CreateUsuarioDto {
    
@IsNotEmpty()
@IsString()
email: string;

@IsString()
@IsNotEmpty()
senha: string;

@IsString()
@IsNotEmpty()
login: string;

@IsString()
@IsNotEmpty()
perfil: Perfil;

@IsInt()
pessoaId: number;

}