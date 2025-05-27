import { Usuario } from "../../usuario/models/usuario.model"; 
import { Disciplina } from "../../disciplina/models/disciplina.model"; 
import { Matricula } from "../../matricula/models/matricula.model";

export interface Turma {
  id: number;
  nome?: string;
  local: string;
  horario: string;
  dataInicial: string; 
  dataFinal: string;
  instrutor?: Usuario | null;
  disciplina?: Disciplina | null;
  matriculas?: Matricula[];
}
