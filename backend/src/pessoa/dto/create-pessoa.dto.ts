import { IsString, IsNotEmpty, } from 'class-validator';
export class CreatePessoaDto {
    
@IsNotEmpty()
  @IsString()
  nome: string;

@IsString()
  @IsNotEmpty()
  cpf: string;

}
