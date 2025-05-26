import { Module } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';

@Module({
  controllers: [AtividadeController],
  providers: [AtividadeService],
})
export class AtividadeModule {}
