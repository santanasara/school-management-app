import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { NotaService } from '../../services/nota.service';
import { TurmaService } from '../../../turma/services/turma.service';
import { Turma } from '../../../turma/models/turma.model';
import { Observable, switchMap } from 'rxjs';
import { MatriculaService } from '../../../matricula/services/matricula.service';
import { Matricula } from '../../../matricula/models/matricula.model';
import { Nota } from '../../models/nota.model';

@Component({
  selector: 'app-nota-create',
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
  templateUrl: './nota-create.component.html',
})
export class NotaCreateComponent implements OnInit {
  
  notaForm!: FormGroup;
  notas: Nota[] = [];
  matriculaId: number | undefined;
  matricula: Matricula | undefined;

  constructor(
    private fb: FormBuilder,
    private notaService: NotaService,
    private router: Router,
    private route: ActivatedRoute,
    private turmaService: TurmaService,
    private matriculaService: MatriculaService

  ) { }

  ngOnInit(): void {

    this.notaForm = this.fb.group({
      valor: [0.0, Validators.required],
      matricula: [null, Validators.required],
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        this.matriculaId = idParam ? +idParam : undefined;
        if (this.matriculaId) {
          return this.matriculaService.getMatriculaById(this.matriculaId);
        }
        return new Observable<Matricula | undefined>();
      })
    ).subscribe(matricula => {
      if (matricula) {
        this.matricula = matricula;
        this.notaForm.get('matricula')?.setValue(this.matricula)
      } else {
        console.error('Curso não encontrado para edição.');
        this.router.navigate(['/cursos']);
      }
    });


  }

  onSubmit(): void {


    if (this.notaForm.valid) {
      this.notaService.createNota(this.notaForm.value).subscribe(() => {
        this.router.navigate(['/notas']);
      });
    } else {
      console.log('Formulário inválido.');
    }


  }

  getNomeTurma() {
    return this.matricula?.turma?.nome?this.matricula?.turma?.nome:this.matricula?.turma?.disciplina?.nome;
  }
}
