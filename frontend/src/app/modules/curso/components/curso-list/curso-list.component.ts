import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos: Curso[] = [];

  // Campos para filtro
  nomeFiltro: string = '';
  cargaMinFiltro: number | null = null;

  constructor(private cursoService: CursoService, private router: Router) { }

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }

  carregarAtivos(): void {
    this.cursoService.getCursosAtivos().subscribe(data => {
      this.cursos = data;
    });
  }

  buscarPorNome(nome: string): void {
    if (!nome.trim()) {
      this.loadCursos();
      return;
    }
    this.cursoService.getCursosPorNome(nome).subscribe(data => {
      this.cursos = data;
    });
  }

  buscarPorCarga(min: number | null): void {
    if (!min || min <= 0) {
      this.loadCursos();
      return;
    }
    this.cursoService.getCursosPorCargaMinima(min).subscribe(data => {
      this.cursos = data;
    });
  }

  // Chamadas para lidar com filtros nos inputs
  onNomeFiltroChange(value: string): void {
    this.nomeFiltro = value;
    this.buscarPorNome(value);
  }

  onCargaFiltroChange(value: string): void {
    const num = Number(value);
    this.cargaMinFiltro = isNaN(num) ? null : num;
    this.buscarPorCarga(this.cargaMinFiltro);
  }

  editCurso(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/cursos', 'editar', id]);
    }
  }

  deleteCurso(id: number | undefined): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.loadCursos();
      });
    }
  }
}
