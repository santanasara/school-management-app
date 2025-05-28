import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { TipoMaterial } from './entities/tipo-material.enum';

@Controller('materiais')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get('/por-disciplina/:disciplinaId')
  findByDisciplina(@Param('disciplinaId') disciplinaId: string) {
    return this.materialService.findByDisciplina(+disciplinaId);
  }

  @Get('/por-tipo/:tipo')
  findByTipo(@Param('tipo') tipo: TipoMaterial) {
    return this.materialService.findByTipo(tipo);
  }

  @Get('/por-titulo/:titulo')
  findByTitulo(@Param('titulo') titulo: string) {
    return this.materialService.findByTitulo(titulo);
  }

  @Get('/buscar')
  buscarComFiltros(
    @Query('tipo') tipo?: string,
    @Query('disciplinaId') disciplinaId?: string,
    @Query('titulo') titulo?: string,
  ) {
    return this.materialService.buscarComFiltros(
      tipo,
      disciplinaId ? +disciplinaId : undefined,
      titulo,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
