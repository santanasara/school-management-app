import { Nota } from "../../nota/models/nota.model";
import { Turma } from "../../turma/models/turma.model";
import { Usuario } from "../../usuario/models/usuario.model";

export interface Matricula {
  id: number;
  data_matricula: string;
  usuario: Usuario;
  turma: Turma;
  notas?: Nota[];
}
