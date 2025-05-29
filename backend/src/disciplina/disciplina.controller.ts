import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { FilterByLocalDto } from './dto/filter-by-local.dto';
import { FilterByInstrutorDto } from './dto/filter-by-instrutor.dto';
import { FilterByNomeDto } from './dto/filter-by-nome.dto';
import { FilterByCursoIdDto } from './dto/filter-by-curso-id.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('disciplinas')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof')
  @Post()
  create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinaService.create(createDisciplinaDto);
  }

  @Get()
  findAll() {
    return this.disciplinaService.findAll();
  }

  @Get('por-curso')
  findByCurso(@Query() query: FilterByCursoIdDto) {
    return this.disciplinaService.findByCursoId(query.cursoId);
  }

  @Get('por-local')
  findByLocal(@Query() query: FilterByLocalDto) {
    return this.disciplinaService.findByLocal(query.local);
  }

  @Get('por-instrutor')
  findByInstrutor(@Query() query: FilterByInstrutorDto) {
    return this.disciplinaService.findByInstrutor(query.instrutorId);
  }

  @Get('por-nome')
  findByNome(@Query() query: FilterByNomeDto) {
    return this.disciplinaService.findByNome(query.nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisciplinaDto: UpdateDisciplinaDto,
  ) {
    return this.disciplinaService.update(+id, updateDisciplinaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplinaService.remove(+id);
  }
}
