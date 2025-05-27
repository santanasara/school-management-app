import { Matricula } from "../../matricula/models/Matricula";

export interface Turma {
    id: number;
    nome?: string;
    local: string;
    horario: string;
    dataInicial: Date;
    dataFinal: Date;
    //instrutor?: Usuario | null;
    //disciplina?: Disciplina | null;
    matriculas: Matricula[];
}