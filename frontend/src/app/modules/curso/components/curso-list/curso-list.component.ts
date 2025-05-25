// src/app/modules/curso/components/curso-list/curso-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // Router para navegação programática
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../curso'; 

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // Para os links 'Ver Detalhes', 'Editar', 'Novo Curso'
  ],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService, private router: Router) { }

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(data => {
      console.log('Dados de cursos recebidos do serviço:', data); // <--- Adicione esta linha
      this.cursos = data;
  });
}

  editCurso(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/cursos', 'editar', id]);
    }
  }

  deleteCurso(id: number | undefined): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.loadCursos(); // Recarrega a lista após a exclusão
        console.log(`Curso com ID ${id} excluído com sucesso!`);
      });
    }
  }
}