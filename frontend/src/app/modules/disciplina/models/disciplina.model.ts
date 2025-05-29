import { Turma } from "../../turma/models/turma.model";
import { Curso } from "../../curso/models/curso.model"; 

export interface Disciplina {
  id: number;
  nome: string;
  descricao?: string;
  curso: Curso;              
  turmas?: Turma[];
}