import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model'; 
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-curso-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCard
  ],
  templateUrl: './curso-edit.component.html',
})
export class CursoEditComponent implements OnInit {
  cursoForm!: FormGroup; 
  cursoId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      id: [''], 
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      cargaHoraria: ['', [Validators.required, Validators.min(1)]],
      status: [true, Validators.required]
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        this.cursoId = idParam ? +idParam : undefined;
        if (this.cursoId) {
          return this.cursoService.getCursoById(this.cursoId);
        }
        return new Observable<Curso | undefined>();
      })
    ).subscribe(curso => {
      if (curso) {
        this.cursoForm.patchValue(curso);
      } else {
        console.error('Curso não encontrado para edição.');
        this.router.navigate(['/cursos']);
      }
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid && this.cursoId !== undefined) {
      const cursoAtualizado: Curso = { ...this.cursoForm.value, id: this.cursoId };
      this.cursoService.updateCurso(this.cursoId, cursoAtualizado).subscribe(() => {
        console.log('Curso atualizado com sucesso!');
        this.router.navigate(['/cursos']);
      });
    } else {
      console.log('Formulário inválido ou ID do curso ausente.');
    }
  }
}
