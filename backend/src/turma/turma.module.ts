import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Turma, Usuario, Disciplina])],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}
