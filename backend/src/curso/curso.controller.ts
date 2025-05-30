import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof')
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @Get('ativos')
  findAtivos() {
    return this.cursoService.findAtivos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(+id, updateCursoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }

  @Get('buscar-por-nome/:nome')
  findByNome(@Param('nome') nome: string) {
    return this.cursoService.findByNome(nome);
  }

  @Get('carga-maior-que/:min')
  findByCargaMinima(@Param('min') min: number) {
    return this.cursoService.findByCargaHorariaMinima(Number(min));
  }
}
