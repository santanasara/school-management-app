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
import { Matricula } from '../../models/Matricula';
<<<<<<< HEAD
import { Turma } from '../../../turma/models/Turma';
=======
>>>>>>> 464fdbb23067315765804cdfa87c8a34a0f1b9c6
import { TurmaService } from '../../../turma/services/turma.service';

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
  ],
  templateUrl: './matricula-list.component.html',
})
export class MatriculaListComponent implements OnInit {
  
  matriculas: Matricula[] = [];
  
  nomeFiltro: string = '';
  cargaMinFiltro: number | null = null;

  displayedColumns: string[] = ['id', 'disciplina', 'horario', 'acoes'];

  constructor(
    private matriculaService: MatriculaService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadMatriculas();
  }

  loadMatriculas(): void {
    this.matriculaService.getMatriculas().subscribe(data => {
      this.matriculas = data;
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
  
}
