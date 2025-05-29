import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async validate(payload: any) {
        return {
            userId: payload.sub,
            username: payload.username,
            perfil: payload.perfil
        };
    }
}