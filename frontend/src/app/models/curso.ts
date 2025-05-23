// Interface que representa um Curso. Serve como "contrato" de dados.
export interface Curso {
  id?: number; 
  nome: string;
  descricao: string;
  cargaHoraria: number;
}
