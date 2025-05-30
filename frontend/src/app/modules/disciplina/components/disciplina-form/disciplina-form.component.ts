import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DisciplinaService } from '../../services/disciplina.service'; 
import { Disciplina } from '../../models/disciplina.model'; 
import { MatCard } from '@angular/material/card';
import { Curso } from '../../../curso/models/curso.model';
import { CursoService } from '../../../curso/services/curso.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-disciplina-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatSelectModule
  ],
  templateUrl: './disciplina-form.component.html',
})
export class DisciplinaFormComponent implements OnInit {
  disciplinaService = inject(DisciplinaService);
  cursoService = inject(CursoService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  disciplina: Partial<Disciplina> & { cursoId?: number } = {};
  cursos: Curso[] = []; 
  editando = false;

  ngOnInit(): void {
    this.cursoService.getCursosAtivos().subscribe(c => this.cursos = c);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.disciplinaService.getById(+id).subscribe((d) => {
        this.disciplina = {
          ...d,
          cursoId: d.curso?.id
        };
      });
    }
  }

  salvar(): void {
    const payload = {
      ...this.disciplina,
      curso: { id: this.disciplina.cursoId }
    };

    if (this.editando && this.disciplina.id) {
      this.disciplinaService.update(this.disciplina.id, payload).subscribe(() => this.router.navigate(['/disciplinas']));
    } else {
      this.disciplinaService.create(payload).subscribe(() => this.router.navigate(['/disciplinas']));
    }
  }
}
