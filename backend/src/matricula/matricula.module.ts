import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { Matricula } from './entities/matricula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from 'src/turma/entities/turma.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matricula, Turma, Usuario])],
  controllers: [MatriculaController],
  providers: [MatriculaService],
  exports: [MatriculaService]
})
export class MatriculaModule {}
