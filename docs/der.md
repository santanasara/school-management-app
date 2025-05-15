```mermaid
erDiagram

  USUARIO {
    int id
    string nome
    string email
    string senha
    string perfil
  }

  CURSO {
    int id
    string nome
    string descricao
  }

  DISCIPLINA {
    int id
    string nome
    string descricao
    int curso_id
  }

  TURMA {
    int id
    string nome
    string periodo
    int disciplina_id
    int instrutor_id
  }

  MATRICULA {
    int id
    int aluno_id
    int turma_id
    date data_matricula
  }

  MATERIAL {
    int id
    string titulo
    string tipo
    string link_arquivo
    int disciplina_id
  }

  NOTA {
    int id
    int aluno_id
    int disciplina_id
    float valor
    date data_lancamento
  }

  MENSAGEM {
    int id
    string assunto
    string corpo
    int remetente_id
    int destinatario_id
    date data_envio
  }

  ATIVIDADE {
    int id
    string titulo
    string descricao
    date data_limite
    int disciplina_id
  }

  USUARIO ||--o{ MATRICULA : participa
  USUARIO ||--o{ MENSAGEM : envia
  USUARIO ||--o{ MENSAGEM : recebe
  USUARIO ||--o{ NOTA : recebe
  USUARIO ||--o{ TURMA : leciona

  CURSO ||--o{ DISCIPLINA : inclui
  DISCIPLINA ||--o{ TURMA : organiza
  DISCIPLINA ||--o{ MATERIAL : possui
  DISCIPLINA ||--o{ NOTA : atribui
  DISCIPLINA ||--o{ ATIVIDADE : possui

  TURMA ||--o{ MATRICULA : contem
```
