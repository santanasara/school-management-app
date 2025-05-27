import { IsString, IsOptional, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateAtividadeDto{

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsDateString()
    dataInicial: string;

    @IsDateString()
    dataFinal: string;

    @IsInt()
    turmaId?: number;

}
