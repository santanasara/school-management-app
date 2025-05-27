import { IsString, IsOptional, IsNotEmpty, IsDateString, IsInt } from 'class-validator';
export class CreateTurmaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsString()
  @IsNotEmpty()
  local: string;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsDateString()
  dataInicial: string;

  @IsDateString()
  dataFinal: string;

  @IsOptional()
  @IsInt()
  instrutorId?: number;

  @IsOptional()
  @IsInt()
  disciplinaId?: number;
}
