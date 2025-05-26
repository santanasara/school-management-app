export enum SituacaoMatricula {
    ATIVA = 'ATIVA',
    CANCELADA = 'CANCELADA',
    TRANCADA = 'TRANCADA',
    CONCLUIDA = 'CONCLUIDA',
}

export const situacao_matricula = [
  { discriminator: SituacaoMatricula.ATIVA, nome: 'Ativa' },
  { discriminator: SituacaoMatricula.CANCELADA, nome: 'Cancelada' },
  { discriminator: SituacaoMatricula.TRANCADA, nome: 'Trancada' },
  { discriminator: SituacaoMatricula.CONCLUIDA, nome: 'Concluida' },
]
