import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatriculaService } from '../../services/matricula.service';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Matricula } from '../../models/matricula.model';
import { Usuario } from '../../../usuario/models/usuario.model';
import { UsuarioService } from '../../../usuario/usuario.service';

@Component({
  selector: 'app-matricula-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './matricula-details.component.html',
})
export class MatriculaDetailsComponent implements OnInit {
  
  matricula: Matricula | undefined;
  alunos: Usuario | undefined;

  constructor(
    private route: ActivatedRoute,
    private matriculaService: MatriculaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {

        const id = +idParam;
        this.matriculaService.getMatriculaById(id).subscribe(data => {
          this.matricula = data;
        });

      }
    });
  }

  getNomeTurma() {
    return this.matricula?.turma?.nome?this.matricula?.turma?.nome:this.matricula?.turma?.disciplina?.nome;
  }
}
