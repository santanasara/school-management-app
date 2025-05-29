import { SetMetadata } from '@nestjs/common';
import { Perfil } from 'src/usuario/entities/usuario.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Perfil[]) => SetMetadata(ROLES_KEY, roles);