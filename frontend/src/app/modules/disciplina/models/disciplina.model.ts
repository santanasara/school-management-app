import { Turma } from "../../turma/models/turma.model";

export interface Disciplina {
  id: number;
  nome: string;
  descricao?: string;
  turmas?: Turma[];
}
