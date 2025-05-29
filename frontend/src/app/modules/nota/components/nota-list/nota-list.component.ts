import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Nota } from '../../models/nota.model';
import { NotaService } from '../../services/nota.service';
import { TurmaService } from '../../../turma/services/turma.service';
import { Observable, switchMap } from 'rxjs';
import { Usuario } from '../../../usuario/models/usuario.model';
import { Turma } from '../../../turma/models/turma.model';
import { situacao_matricula, SituacaoMatricula } from '../../../matricula/models/SituacaoMatricula';
import { Matricula } from '../../../matricula/models/matricula.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogNotasComponent } from '../dialog-notas/dialog-notas.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-nota-list',
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
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './nota-list.component.html',
})
export class NotaListComponent implements OnInit {

  matriculas: Matricula[] = [];
  turmaId: number | undefined;
  turma: Turma | undefined;

  nomeFiltro: string = '';
  cargaMinFiltro: number | null = null;

  displayedColumns: string[] = ['nome', 'status', 'acoes'];

  constructor(
    private notaService: NotaService,
    private turmaService: TurmaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        this.turmaId = idParam ? +idParam : undefined;
        if (this.turmaId) {
          return this.turmaService.finOne(this.turmaId);
        }
        return new Observable<Turma | undefined>();
      })
    ).subscribe(turma => {
      if (turma) {
        this.turma = turma;
        this.loadMatriculas();
      } else {
        console.error('Curso não encontrado para edição.');
        this.router.navigate(['/cursos']);
      }
    });

  }

  loadMatriculas(): void {
    this.matriculas = this.turma?.matriculas ?? [];
  }



  carregarAtivos(): void {
    this.matriculas = this.turma?.matriculas?.filter(matricula => { matricula.situacaoMatricula == SituacaoMatricula.ATIVA })?? []
  }

  buscarPorNome(nome: string): void {
    if (!nome.trim()) {
      this.loadMatriculas();
      return;
    }
    
    this.matriculas = this.turma?.matriculas?.filter(matricula => { matricula.usuario.pessoa.nome.includes(nome) })?? []

  }

  buscarPorCarga(min: number | null): void {
    /*
    if (!min || min <= 0) {
      this.loadCursos();
      return;
    }
    this.notaService.getCursosPorCargaMinima(min).subscribe(data => {
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

  editNota(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/notas', 'editar', id]);
    }
  }

  deleteNota(id: number | undefined): void {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este curso?')) {
      this.notaService.deleteNota(id).subscribe(() => {
        this.loadMatriculas();
      });
    }
  }

  getSituacaoMatricula(matricula: Matricula) {
        return situacao_matricula.find(situacao => situacao.discriminator == matricula.situacaoMatricula)?.nome ?? '';
  }

  exibirnotas(matricula: Matricula) {
    this.dialog.open(DialogNotasComponent, {
      width: '400px', // opcional
      data: { 
        matricula: matricula
       }
    });
  }

}
