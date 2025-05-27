import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DisciplinaService } from '../../services/disciplina.service'; 
import { Disciplina } from '../../models/disciplina.model'; 

@Component({
  selector: 'app-disciplina-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, FormsModule, RouterModule],
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

  buscarPorNome(): void {
    if (!this.filtroNome.trim()) {
      this.carregarDisciplinas();
    } else {
      this.disciplinaService.getByNome(this.filtroNome).subscribe((dados) => (this.disciplinas = dados));
    }
  }

  deletar(id: number): void {
    this.disciplinaService.delete(id).subscribe(() => this.carregarDisciplinas());
  }
}
