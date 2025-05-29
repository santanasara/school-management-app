import { Turma } from "../../turma/models/Turma";
import { SituacaoMatricula } from "./SituacaoMatricula";

export interface Matricula {

    id: number;
    dataDatricula: Date;
    //usuario: Usuario;
    turma: Turma;
    //notas: Nota[];
    situacaoMatricula: SituacaoMatricula;

}