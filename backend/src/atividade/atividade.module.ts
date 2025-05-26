import { Module } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from 'src/turma/entities/turma.entity';
import { Atividade } from './entities/atividade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Turma, Atividade])],
  controllers: [AtividadeController],
  providers: [AtividadeService],
  exports: [AtividadeService]
})
export class AtividadeModule {}
