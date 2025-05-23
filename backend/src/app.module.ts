import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';


function getEnvFilePath(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.prod';
    case 'development':
      return '.env';
    case 'debug':
      return '.env.debug';
    default:
      return '.env'; // fallback
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
    }),
    PessoaModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}