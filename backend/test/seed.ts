import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TurmaService } from '../src/turma/turma.service';
import { AtividadeService } from 'src/atividade/atividade.service';
import { CreateAtividadeDto } from 'src/atividade/dto/create-atividade.dto';

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

  await turmaService.create(turma1);
  await turmaService.create(turma2);
  await turmaService.create(turma1);
  await turmaService.create(turma1);
  await turmaService.create(turma1);
  await turmaService.create(turma1);

  await atividadeService.create(atividade1);
  await atividadeService.create(atividade2);
  await atividadeService.create(atividade3);
  await atividadeService.create(atividade4);

  await app.close();
}
bootstrap();