import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('atividade')
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('prof')
  @Post()
  create(@Body() createAtividadeDto: CreateAtividadeDto) {
    return this.atividadeService.create(createAtividadeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.atividadeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atividadeService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('prof')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtividadeDto: UpdateAtividadeDto) {
    return this.atividadeService.update(+id, updateAtividadeDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('prof')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atividadeService.remove(+id);
  }
}
