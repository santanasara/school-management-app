import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { Nota } from "../../models/nota.model";
import { Matricula } from "../../../matricula/models/matricula.model";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { MatriculaService } from "../../../matricula/services/matricula.service";
import { NotaService } from "../../services/nota.service";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-dialog-notas',
  templateUrl: './dialog-notas.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  standalone: true
})
export class DialogNotasComponent implements OnInit {

  notaForm!: FormGroup;
  matriculaId: number | undefined;
  matricula: Matricula | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private matriculaService: MatriculaService,
    private router: Router,
    private notaService: NotaService,

  ) {
    this.matricula = data.matricula;
  }

  ngOnInit(): void {

    this.notaForm = this.fb.group({
      valor: [0.0, Validators.required],
      matricula: [this.matricula, Validators.required],
    });

  }

  onSubmit(): void {


    if (this.notaForm.valid) {
      this.notaService.createNota(this.notaForm.value).subscribe(() => {

        this.atualizarTurma();

      });
    } else {
      console.log('Formulário inválido.');
    }


  }

  private atualizarTurma() {
    if (this.matricula?.id !== undefined) {
      this.matriculaService.getMatriculaById(this.matricula.id).subscribe((matricula: Matricula) => {
        this.matricula = matricula;
      });
    }
  }

  getNomeTurma() {
    return this.matricula?.turma?.nome ? this.matricula?.turma?.nome : this.matricula?.turma?.disciplina?.nome;
  }

  deleteNota(notaId: number) {
    this.notaService.deleteNota(notaId).subscribe(nota => {
      this.atualizarTurma();
    })
  }

}