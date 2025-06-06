import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatriculaService } from '../../services/matricula.service';
import { SituacaoMatricula } from '../../models/SituacaoMatricula';
import { TurmaService } from '../../../turma/services/turma.service';
import { Turma } from '../../../turma/models/turma.model';
import { Matricula } from '../../models/matricula.model';

@Component({
  selector: 'app-matricula-create',
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
  templateUrl: './matricula-create.component.html',
})
export class MatriculaCreateComponent implements OnInit {
  matriculaForm!: FormGroup;
  turmas: Turma[] = [];


  constructor(
    private fb: FormBuilder,
    private matriculaService: MatriculaService,
    private router: Router,
    private turmaService: TurmaService

  ) { }

  ngOnInit(): void {
    this.matriculaForm = this.fb.group({
      dataDatricula: [new Date(), Validators.required],
      turma: [null, Validators.required],
      situacaoMatricula: [SituacaoMatricula.ATIVA, Validators.required],
    });
    this.loadTurmasDisponiveis();
  }

  onSubmit(): void {
    if (this.matriculaForm.valid) {
      this.matriculaService.createMatricula(this.matriculaForm.value).subscribe({
        next: () => {
          console.log('Matricula criada com sucesso!');
          this.router.navigate(['/matriculas']);
        },
        error: (err) => {
          console.error('Erro ao criar matrícula:', err.error.message);
          window.alert(err.error.message);
        }
      });
    } else {
      console.log('Formulário inválido.');
    }
  }

  loadTurmasDisponiveis(): void {
    this.turmaService.loadTurmasDisponiveis().subscribe(data => {
      this.turmas = data;
    });
  }

  getNomeTurma(turma: Turma) {
    return turma?.nome?turma?.nome:turma?.disciplina?.nome;
  }
}
