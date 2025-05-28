import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { TipoMaterial } from '../entities/tipo-material.enum';

export class CreateMaterialDto {
  @IsString()
  titulo: string;

  @IsEnum(TipoMaterial)
  tipo: TipoMaterial;

  @IsString()
  link_arquivo: string;

  @IsOptional()
  @IsInt()
  disciplina_id?: number;
}
