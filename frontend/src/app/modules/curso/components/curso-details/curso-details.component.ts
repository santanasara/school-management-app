// src/app/modules/curso/components/curso-details/curso-details.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Para obter parâmetros da URL
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso'; 


@Component({
  selector: 'app-curso-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // Para o link "Voltar para a lista"
  ],
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  curso: Curso | undefined;

  constructor(
    private route: ActivatedRoute, // Para acessar a rota atual
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = +idParam; // Converte string para número
        this.cursoService.getCursoById(id).subscribe(data => {
          this.curso = data;
        });
      }
    });
  }
}