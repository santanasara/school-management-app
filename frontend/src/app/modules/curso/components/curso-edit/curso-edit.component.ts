// src/app/modules/curso/components/curso-edit/curso-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../curso'; 
import { switchMap } from 'rxjs/operators'; // Para encadear observables
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curso-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.css']
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
      id: [''], // Campo oculto para o ID
      nome: ['', Validators.required],
      cargaHoraria: ['', [Validators.required, Validators.min(1)]],
    });

    // Obtém o ID da rota e carrega os dados do curso
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        this.cursoId = idParam ? +idParam : undefined;
        if (this.cursoId) {
          return this.cursoService.getCursoById(this.cursoId);
        }
        return new Observable<Curso | undefined>(); // Retorna um observable vazio se não houver ID
      })
    ).subscribe(curso => {
      if (curso) {
        this.cursoForm.patchValue(curso); // Preenche o formulário com os dados do curso
      } else {
        console.error('Curso não encontrado para edição.');
        this.router.navigate(['/cursos']); // Redireciona se o curso não for encontrado
      }
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid && this.cursoId !== undefined) {
      const cursoAtualizado: Curso = { ...this.cursoForm.value, id: this.cursoId };
      this.cursoService.updateCurso(this.cursoId, cursoAtualizado).subscribe(() => {
        console.log('Curso atualizado com sucesso!');
        this.router.navigate(['/cursos']); // Redireciona para a lista de cursos
      });
    } else {
      console.log('Formulário inválido ou ID do curso ausente.');
    }
  }
}