import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TurmaService } from '../src/turma/turma.service';

const turma2 = {
    "local": "EAD",
    "horario": "24T12",
    "dataInicial": "2025-05-12",
    "dataFinal": "2025-06-12",
    // "instrutorId": 1,
    // "disciplinaId": 1
}

const turma1 = {
    "nome": "Nome de Turma Simples",
    "local": "EAD",
    "horario": "24T12",
    "dataInicial": "2025-05-12",
    "dataFinal": "2025-06-12",
    // "instrutorId": 1
}


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const turmaService = app.get(TurmaService);

  await turmaService.create(turma1);
  await turmaService.create(turma2);
  await turmaService.create(turma1);
  await turmaService.create(turma1);
  await turmaService.create(turma1);
  await turmaService.create(turma1);

  await app.close();
}
bootstrap();