import { Nota } from "../../nota/models/nota.model";
import { Turma } from "../../turma/models/turma.model";
import { Usuario } from "../../usuario/models/usuario.model";
import { SituacaoMatricula } from "./SituacaoMatricula";

export interface Matricula {

    id: number;
    dataDatricula: Date;
    usuario: Usuario;
    turma: Turma;
    notas: Nota[];
    situacaoMatricula: SituacaoMatricula;

}