import { Component } from '@angular/core';
import { CursoService } from '../app/services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CursoComponent],
  template: `<app-curso></app-curso>`
})
export class CursoComponent {
  cursos: any[] = [];
  nomeCurso: string = '';

  constructor(private cursoService: CursoService) {
    this.listarCursos();
  }

  listarCursos() {
    this.cursoService.getCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });
  }

  adicionarCurso() {
    if (!this.nomeCurso.trim()) return;

    this.cursoService.adicionarCurso({ nome: this.nomeCurso }).subscribe(() => {
      this.nomeCurso = '';
      this.listarCursos();
    });
  }

  deletarCurso(id: number) {
    this.cursoService.deletarCurso(id).subscribe(() => {
      this.listarCursos();
    });
  }
}
