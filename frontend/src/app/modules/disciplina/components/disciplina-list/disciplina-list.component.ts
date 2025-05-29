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

@Component({
  selector: 'app-disciplina-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule, RouterModule],
  templateUrl: './disciplina-list.component.html',
})
export class DisciplinaListComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);

  displayedColumns = ['id', 'nome', 'descricao', 'acoes'];
  disciplinas: Disciplina[] = [];
  filtroNome = '';

  ngOnInit(): void {
    this.carregarDisciplinas();
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
