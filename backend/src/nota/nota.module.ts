import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { Nota } from './entities/nota.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nota])],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
