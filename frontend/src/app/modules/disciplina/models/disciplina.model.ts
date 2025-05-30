import { Curso } from "../../curso/models/curso.model";
import { Turma } from "../../turma/models/turma.model";

export interface Disciplina {
  id: number;
  nome: string;
  descricao?: string;
  curso: Partial<Curso>; 
  cursoId?: number;
  turmas?: Turma[];
}
