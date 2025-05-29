import { Curso } from './../../../curso/models/curso.model';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DisciplinaService } from '../../services/disciplina.service'; 
import { Disciplina } from '../../models/disciplina.model'; 
import { CursoService } from '../../../curso/services/curso.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-disciplina-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, FormsModule, RouterModule],
  templateUrl: './disciplina-list.component.html',
})
export class DisciplinaListComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private cursoService = inject(CursoService)

  displayedColumns = ['id', 'nome', 'descricao', 'curso', 'acoes'];
  disciplinas: Disciplina[] = [];
  cursos: Curso[] = []
  filtroNome = '';
  filtroCurso: number | null = null;

  ngOnInit(): void {
    this.carregarDisciplinas();
    this.carregarCursos();
  }

  carregarCursos(): void {
    this.cursoService.getCursosAtivos().subscribe((dados) => (this.cursos = dados));
  }

  carregarDisciplinas(): void {
    this.disciplinaService.getAll().subscribe((dados) => (this.disciplinas = dados));
  }

  buscarPorNome(nome: string): void {
    if (!this.filtroNome.trim()) {
      this.carregarDisciplinas();
    } else {
      this.disciplinaService.getByNome(nome).subscribe((dados) => (this.disciplinas = dados));
    }
  }


  buscarDisciplinas(): void {
    if (!this.filtroNome.trim() && (this.filtroCurso === null || this.filtroCurso === 0)) {
      this.carregarDisciplinas();
    } else if (this.filtroCurso !== null && this.filtroCurso !== 0) {
      this.disciplinaService.getByCurso(this.filtroCurso).subscribe(dados => {
        this.disciplinas = dados;
      });
    }
  }


  onNomeFiltroChange(value: string): void {
    this.filtroNome = value;
    this.buscarPorNome(value);
  }

  deleteDisciplina(id: number | undefined): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir esta disciplina?')) {
      this.disciplinaService.delete(id).subscribe(() => {
        this.carregarDisciplinas();
      });
    }
  }
}
