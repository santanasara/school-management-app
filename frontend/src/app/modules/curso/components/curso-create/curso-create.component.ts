import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-curso-create',
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
  templateUrl: './curso-create.component.html',
})
export class CursoCreateComponent implements OnInit {
  cursoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      cargaHoraria: ['', [Validators.required, Validators.min(1)]],
      status: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      this.cursoService.createCurso(this.cursoForm.value).subscribe(() => {
        console.log('Curso criado com sucesso!');
        this.router.navigate(['/cursos']);
      });
    } else {
      console.log('Formulário inválido.');
    }
  }
}
