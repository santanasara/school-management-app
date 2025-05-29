import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TurmaService } from './services/turma.service';
import { UsuarioService } from '../usuario/usuario.service';
import { DisciplinaService } from '../disciplina/services/disciplina.service';
import { Turma } from './models/turma.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turma',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.css'
})

export class TurmaComponent {
  form: FormGroup;
  private service = inject(TurmaService);
  private disciplinaService = inject(DisciplinaService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  turmas$ = this.service.listar();
  disciplinas$ = this.disciplinaService.getAll();
  instrutores$ = this.usuarioService.listarProfessores();

  displayedColumns: string[] = [
    'nome',
    'local',
    'horario',
    'dataInicial',
    'dataFinal',
    'disciplina',
    'instrutor',
    'acoes'
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id:[null],
      nome: ['', Validators.required],
      local: ['', Validators.required],
      horario: ['', Validators.required],
      dataInicial: [null, Validators.required],
      dataFinal: [null, Validators.required],
      disciplinaId: [null],
      instrutorId: [null],
    });
  }

  salvar() {
    const turma = this.form.value;
    if (this.form.valid) {
      if (turma.id) {
        this.service.alterar(turma.id, turma).subscribe(() => {
          this.turmas$ = this.service.listar();
          this.cancelarEdicao();
        });
      } else {
        this.service.criar(turma).subscribe(() => {
          this.turmas$ = this.service.listar();
          this.cancelarEdicao();
        });
      }

    } else {
      this.form.markAllAsTouched();
    }
  }

  exibirTurma(turma: Turma){
    this.router.navigate(['/turma', turma.id]);
  }

  iniciarEdicao(turma: Turma) {
    this.form.patchValue(turma);
  }

  cancelarEdicao(){
    this.form.reset();
    Object.values(this.form.controls).forEach(control => {
      control.markAsPristine();
      control.markAsUntouched();
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  excluir(turma: any) {
    this.service.remover(turma.id).subscribe(()=> this.turmas$ = this.service.listar());
  }

}
