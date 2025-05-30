import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatriculaService } from '../../services/matricula.service';
import { Matricula } from '../../models/matricula.model';
import { TurmaService } from '../../../turma/services/turma.service';
import { Turma } from '../../../turma/models/turma.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
  ],
  templateUrl: './matricula-list.component.html',
})
export class MatriculaListComponent implements OnInit {
  
  matriculas: Matricula[] = [];
  turmas: Turma[] = [];
  
  nomeFiltro: string = '';
  turmaFiltro: Turma | null  = null;
  cargaMinFiltro: number | null = null;

  displayedColumns: string[] = ['id', 'nome', 'disciplina', 'horario', 'acoes'];

  constructor(
    private matriculaService: MatriculaService, 
    private router: Router,
    private turmasService: TurmaService
  ) { }

  ngOnInit(): void {

    this.loadMatriculas();
    this.loadTurmas();
  }

  loadMatriculas(): void {
    this.matriculaService.getMatriculas().subscribe(data => {
      this.matriculas = data;
    });
  }

  loadTurmas() : void {
   
    this.turmasService.getTurmas().subscribe(data => {
      this.turmas = data;
    });
   
  }


  carregarAtivos(): void {
    /*
    this.matriculaService.getCursosAtivos().subscribe(data => {
      this.cursos = data;
    });
    */
  }

  buscarPorNome(nome: string): void {
    if (!nome.trim()) {
      this.loadMatriculas();
      return;
    }
    this.matriculaService.getMatriculasPorNome(nome).subscribe(data => {
      this.matriculas = data;
    });
  }

  buscarPorCarga(min: number | null): void {
    /*
    if (!min || min <= 0) {
      this.loadCursos();
      return;
    }
    this.matriculaService.getCursosPorCargaMinima(min).subscribe(data => {
      this.cursos = data;
    });
    */
  }

  onNomeFiltroChange(value: string): void {
    this.nomeFiltro = value;
    this.buscarPorNome(value);
  }

  onTurmaFiltroChange(event: MatSelectChange) {
    this.matriculaService.getMatriculasPorTurma(event.value.id).subscribe(matriculas => {
      this.matriculas = matriculas;
    })
  }

  onCargaFiltroChange(value: string): void {
    /*
    const num = Number(value);
    this.cargaMinFiltro = isNaN(num) ? null : num;
    this.buscarPorCarga(this.cargaMinFiltro);
    */
  }

  editMatricula(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/matriculas', 'editar', id]);
    }
  }

  deleteMatricula(id: number | undefined): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este curso?')) {
      this.matriculaService.deleteMatricula(id).subscribe(() => {
        this.loadMatriculas();
      });
    }
  }

  getNomeTurmaFromMatricula(matricula: Matricula) {
    return matricula?.turma?.nome?matricula?.turma?.nome:matricula?.turma?.disciplina?.nome;
  }

  getNomeTurmaFromTurma(turma: Turma) {
    return turma?.nome?turma?.nome:turma?.disciplina?.nome;
  }
  
}
