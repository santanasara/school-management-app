import { Pessoa } from "./Pessoa";

export type Perfil = 'prof' | 'aluno' | 'admin';

export interface Usuario {
    id: number,
    email: string,
    perfil: Perfil,
    pessoa: Pessoa,
}