import { Pessoa } from '../../pessoa/models/pessoa.model'; 
import { Matricula } from '../../matricula/models/matricula.model'; 

export type Perfil = 'prof' | 'aluno' | 'admin';

export interface Usuario {
  id: number;
  pessoa_id: number;
  pessoa: Pessoa;
  email?: string;
  senha?: string;
  login?: string;
  perfil: Perfil;
  matriculas?: Matricula[];
}
