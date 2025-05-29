import { IsInt } from "class-validator";
import { CreateTurmaDto } from "src/turma/dto/create-turma.dto";

export class CreateMatriculaDto {
    @IsInt()
    turmaId: number;
    @IsInt()
    usuarioId: number;
}
