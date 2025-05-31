import { Component, inject, input, } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Observable, } from "rxjs";
import { TurmaService } from "../services/turma.service";
import { Atividade } from "./models/atividade.models";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AtividadeService } from "./service/atividade.service";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../auth/services/auth";

@Component({
  selector: 'app-atividade',
  imports: [MatTableModule, CommonModule, MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './atividade.component.html',
  styleUrl: './atividade.component.css',
  standalone: true,
})
export class AtividadeComponent {
  form: FormGroup;
  displayedColumns: string[] = [
    'titulo',
    'descricao',
    'dataInicial',
    'dataFinal',
    'acoes'
  ];

  turmaId = input.required<number>();
  private turmaService = inject(TurmaService);
  private atividadeService = inject(AtividadeService);

  atividades$: Observable<Atividade[]> | undefined;
  private authService = inject(AuthService)

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id:[null],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataInicial: [null, Validators.required],
      dataFinal: [null, Validators.required],
    });
  }

  ngOnInit(){
    this.atividades$ = this.turmaService.listarAtividades(this.turmaId());
  }

  usuarioAdmin(){
    return this.authService.hasRole(['admin'])
  }

  usuarioProfessor(){
    return this.authService.hasRole(['prof'])
  }

  salvar() {

    const atividade = this.form.value;
    if (this.form.valid) {
      if (atividade.id) {
        this.atividadeService.alterar(atividade.id, {...atividade, turmaId:this.turmaId()}).subscribe(() => {
          this.atividades$ = this.turmaService.listarAtividades(this.turmaId());
          this.cancelarEdicao();
        });
      } else {
        this.atividadeService.criar({...atividade, turmaId:this.turmaId()}).subscribe(() => {
          this.atividades$ = this.turmaService.listarAtividades(this.turmaId());
          this.cancelarEdicao();
        });
      }

    } else {
      this.form.markAllAsTouched();
    }
  }

  iniciarEdicao(atividade: Atividade) {
    this.form.patchValue(atividade);
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

  excluir(atividade: any) {
    this.atividadeService.remover(atividade.id).subscribe(()=> this.atividades$ = this.turmaService.listarAtividades(this.turmaId()));
  }


}

