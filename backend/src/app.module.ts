import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TurmaModule } from './turma/turma.module';
import { AtividadeModule } from './atividade/atividade.module';
import { DatabaseModule } from './config/database.module';
import { DisciplinaModule } from './disciplina/disciplina.module';

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
    DatabaseModule,
    PessoaModule,
    UsuarioModule,
    TurmaModule,
    AtividadeModule,
    DisciplinaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}