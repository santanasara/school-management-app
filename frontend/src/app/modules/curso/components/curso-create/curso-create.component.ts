// src/app/modules/curso/components/curso-create/curso-create.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para formulários reativos
import { Router, RouterLink} from '@angular/router'; // Para navegação após a criação
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso'; 


@Component({
  selector: 'app-curso-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './curso-create.component.html',
  styleUrls: ['./curso-create.component.css']
})
export class CursoCreateComponent implements OnInit {
  cursoForm!: FormGroup;

  constructor(
    private fb: FormBuilder, // Injeta FormBuilder para construir o formulário
    private cursoService: CursoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cursoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      cargaHoraria: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const novoCurso: Curso = this.cursoForm.value;
      this.cursoService.createCurso(novoCurso).subscribe(() => {
        console.log('Curso criado com sucesso!');
        this.router.navigate(['/cursos']); 
      });
    } else {
      console.log('Formulário inválido. Preencha todos os campos obrigatórios.');
    }
  }
}