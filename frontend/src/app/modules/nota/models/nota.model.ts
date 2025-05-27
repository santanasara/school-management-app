import { Matricula } from "../../matricula/models/matricula.model";

export interface Nota {
  id: number;
  valor: number;
  data_lancamento: string;
  matricula: Matricula;
}
