import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('matricula')
export class MatriculaController {
  constructor(
    private readonly matriculaService: MatriculaService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof', 'aluno')
  @Post()
  create(@Body() createMatriculaDto: CreateMatriculaDto, @Request() req) {
    return this.matriculaService.create(createMatriculaDto, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof', 'aluno')
  @Get()
  findAll(@Request() req) {
    if (req.user.perfil === 'admin') {
      return this.matriculaService.findAll();
    } else if (req.user.perfil === 'prof') {
      return this.matriculaService.findPorInstrutor(req.user.userId);
    } else if (req.user.perfil === 'aluno') {
      return this.matriculaService.findPorAluno(req.user.userId);
    }

    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    return this.matriculaService.update(+id, updateMatriculaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculaService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof', 'aluno')
  @Get('buscar-por-nome/:nome')
  findByNome(@Param('nome') nome: string, @Request() req) {
    return this.matriculaService.findByNome(nome, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof', 'aluno')
  @Get('buscar-por-turma/:id')
  findByTurma(@Param('id') id: number, @Request() req) {

    if (req.user.perfil === 'admin') {
      return this.matriculaService.listarMatriculasPorTurma(+id);
    } else if (req.user.perfil === 'prof') {
      return this.matriculaService.listarMatriculasPorTurma(+id, req.user.userId);
    } else if (req.user.perfil === 'aluno') {
      return this.matriculaService.findPorAluno(req.user.userId, +id);
    }

    return [];

  }


}
