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
import { Turma } from '../../../turma/models/Turma';
import { TurmaService } from '../../../turma/services/turma.service';

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
      //usuario: Usuario;
      turma: [null, Validators.required],
      //notas: Nota[];
      situacaoMatricula: [SituacaoMatricula.ATIVA, Validators.required],
    });
    this.loadTurmas();
  }

  onSubmit(): void {
    if (this.matriculaForm.valid) {
      this.matriculaService.createMatricula(this.matriculaForm.value).subscribe(() => {
        console.log('Matricula criada com sucesso!');
        this.router.navigate(['/matricula']);
      });
    } else {
      console.log('Formulário inválido.');
    }
  }

  loadTurmas(): void {
    this.turmaService.getTurmas().subscribe(data => {
      this.turmas = data;
    });
  }
}
