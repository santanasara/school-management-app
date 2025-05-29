import { Disciplina } from "../../disciplina/models/disciplina.model";

export enum TipoMaterial {
  VIDEO = 'video',
  PDF = 'pdf',
  AUDIO = 'audio',
  LINK = 'link',
  OUTRO = 'outro',
}

export interface Material {
  id: number;
  titulo: string;
  tipo: TipoMaterial;
  link_arquivo: string;
  disciplina: number;
}
