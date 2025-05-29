import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MaterialService } from '../../services/material.service';
import { Material } from '../../models/material.model';
import { DisciplinaService } from '../../../disciplina/services/disciplina.service';
import { Disciplina } from '../../../disciplina/models/disciplina.model';

@Component({
  selector: 'app-material-list',
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
    MatFormFieldModule
  ],
  templateUrl: './material-list.component.html',
})
export class MaterialListComponent implements OnInit {
  materiais: Material[] = [];
  disciplinas: Disciplina[] = [];

  tituloFiltro: string = '';
  disciplinaFiltroId: number | null = null;

  displayedColumns: string[] = ['id', 'titulo', 'tipo', 'disciplina', 'acoes'];

  constructor(
    private materialService: MaterialService,
    private disciplinaService: DisciplinaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMateriais();
    this.loadDisciplinas();
  }

  loadMateriais(): void {
    this.materialService.getAll().subscribe(data => {
      this.materiais = data;
    });
  }

  loadDisciplinas(): void {
    this.disciplinaService.getAll().subscribe(data => {
      this.disciplinas = data;
    });
  }

  buscarPorTitulo(titulo: string): void {
    if (!titulo.trim()) {
      this.loadMateriais();
      return;
    }
    this.materialService.getByTitulo(titulo).subscribe(data => {
      this.materiais = data;
    });
  }

  buscarPorDisciplina(id: number | null): void {
    if (!id) {
      this.loadMateriais();
      return;
    }
    this.materialService.getByDisciplina(id).subscribe(data => {
      this.materiais = data;
    });
  }

  onTituloFiltroChange(value: string): void {
    this.tituloFiltro = value;
    this.buscarPorTitulo(value);
  }

  onDisciplinaFiltroChange(id: string): void {
    const num = Number(id);
    this.disciplinaFiltroId = isNaN(num) ? null : num;
    this.buscarPorDisciplina(this.disciplinaFiltroId);
  }

  editMaterial(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/materiais', 'editar', id]);
    }
  }

  deleteMaterial(id: number | undefined): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este material?')) {
      this.materialService.delete(id).subscribe(() => {
        this.loadMateriais();
      });
    }
  }
}
