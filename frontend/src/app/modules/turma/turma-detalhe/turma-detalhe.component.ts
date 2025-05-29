import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurmaService } from '../services/turma.service';
import { switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { AtividadeComponent } from '../atividade/atividade.component';

@Component({
  selector: 'app-turma-detalhe',
  imports: [CommonModule, MatriculasComponent, AtividadeComponent],
  templateUrl: './turma-detalhe.component.html',
  styleUrl: './turma-detalhe.component.css'
})
export class TurmaDetalheComponent {
  private route = inject(ActivatedRoute);
  private turmaService = inject(TurmaService);
  

  turma$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return id ? this.turmaService.getById(+id) : [];
    })
  );

}
