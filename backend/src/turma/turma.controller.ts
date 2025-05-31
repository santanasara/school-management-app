import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('turma')
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmaService.create(createTurmaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:turmaId/atividade')
  listarAtividades(@Param('turmaId') id: string) {
    return this.turmaService.listarAtividades(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:turmaId/matricula')
  listarMatriculas(@Param('turmaId') id: string) {
    return this.turmaService.listarMatriculas(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof', 'aluno')
  @Get("/turmas-disponiveis")
  findAllTurmasDisponiveis() {
    return this.turmaService.findAllTurmasDisponiveis();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turmaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmaService.update(+id, updateTurmaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turmaService.remove(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'prof', 'aluno')
  @Get()
  findAll(@Request() req) {
    if (req.user.perfil === 'admin') {
      return this.turmaService.findAll();
    } else if (req.user.perfil === 'prof') {
      return this.turmaService.listarTurmasPorInstrutor(req.user.userId );
    } else if (req.user.perfil === 'aluno') {
      return this.turmaService.listarTurmasPorAluno(req.user.userId );
    }
    return [];
  }



}
