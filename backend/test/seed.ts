import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TurmaService } from '../src/turma/turma.service';
import { AtividadeService } from 'src/atividade/atividade.service';
import { CreateAtividadeDto } from 'src/atividade/dto/create-atividade.dto';
import { DisciplinaService } from 'src/disciplina/disciplina.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { MatriculaService } from 'src/matricula/matricula.service';
import { Matricula } from 'src/matricula/entities/matricula.entity';

const turma1 = {
  "nome": "Nome de Turma Simples",
  "local": "EAD",
  "horario": "24T12",
  "dataInicial": "2025-05-12",
  "dataFinal": "2025-06-12",
  // "instrutorId": 1,
  // "disciplinaId": 1
}
const turma2 = {...turma1, nome: undefined ,}

const atividade1 = {
  "titulo": "Título da atividade",
  "descricao": "Descrição da atividade",
  "dataInicial": "2025-05-12",
  "dataFinal": "2025-06-12",
  "turmaId": 1
}

const atividade2: CreateAtividadeDto = {...atividade1, descricao: ""}
const atividade3: CreateAtividadeDto = {...atividade1, turmaId: 2}
const atividade4: CreateAtividadeDto = {...atividade2, turmaId: 2}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const turmaService = app.get(TurmaService);
  const atividadeService = app.get(AtividadeService);
  const disciplinaService = app.get(DisciplinaService);
  const usuarioService = app.get(UsuarioService);
  const pessoaService = app.get(PessoaService);
  const matricuaService = app.get(MatriculaService);

  await pessoaService.create({nome: "Cleiane Clementino", cpf: "77777777777"})
  await pessoaService.create({nome: "Alvo Dumbledore", cpf: "99999999999"})
  await pessoaService.create({nome: "Manon Bico Negro", cpf: "88888888888"})
  await pessoaService.create({nome: "Luna Lovegood", cpf: "66666666666"})
  await pessoaService.create({nome: "Kovthe", cpf: "55555555555"})
  await pessoaService.create({nome: "Nynaeve", cpf: "44444444444"})

  await usuarioService.create({email: "clei.bondade@gmail.com", "login": "cleiane", "senha": "123456", "perfil": "admin", "pessoaId":1})
  await usuarioService.create({email: "alvoteste.bondade@gmail.com", "login": "juliana", "senha": "123456", "perfil": "prof", "pessoaId":2})
  await usuarioService.create({email: "manonteste.bondade@gmail.com", "login": "manon", "senha": "123456", "perfil": "aluno", "pessoaId":3})
  await usuarioService.create({email: "lunateste.bondade@gmail.com", "login": "luna", "senha": "123456", "perfil": "admin", "pessoaId":4})
  await usuarioService.create({email: "kovtheteste.bondade@gmail.com", "login": "kovthe", "senha": "123456", "perfil": "prof", "pessoaId":5})
  await usuarioService.create({email: "nynaeveteste.bondade@gmail.com", "login": "nynaeve", "senha": "123456", "perfil": "aluno", "pessoaId":6})

  await disciplinaService.create({nome: "Disciplina 1 "})
  await disciplinaService.create({nome: "Disciplina 2 "})
  await disciplinaService.create({nome: "Disciplina 3 "})
  await disciplinaService.create({nome: "Disciplina 4 "})

  await turmaService.create({...turma1, instrutorId:2});
  await turmaService.create({...turma2, instrutorId:5, disciplinaId: 1 });
  await turmaService.create({...turma1,  disciplinaId: 1});
  await turmaService.create({...turma1,  disciplinaId: 2});
  await turmaService.create(turma1);
  await turmaService.create(turma2);

  await atividadeService.create(atividade1);
  await atividadeService.create(atividade2);
  await atividadeService.create(atividade3);
  await atividadeService.create(atividade4);

  await matricuaService.create({turmaId:1, usuarioId: 3})
  await matricuaService.create({turmaId:1, usuarioId: 6})
  await matricuaService.create({turmaId:2, usuarioId: 3})
  await matricuaService.create({turmaId:3, usuarioId: 6})

  await app.close();
}
bootstrap();