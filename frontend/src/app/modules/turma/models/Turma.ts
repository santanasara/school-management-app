import { Disciplina } from "../../disciplina/Disciplina";
import { Matricula } from "../../matricula/models/Matricula";
import { Usuario } from "../../usuario/Usuario";

export interface Turma {
    id: number;
    nome?: string;
    local: string;
    horario: string;
    dataInicial: Date;
    dataFinal: Date;
    instrutor?: Usuario | null;
    disciplina?: Disciplina | null;
    matriculas: Matricula[];
}