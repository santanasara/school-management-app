import { Component,  inject, input} from "@angular/core";
import { TurmaService } from "../../services/turma.service";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Observable, } from "rxjs";
import { Matricula } from "../../../matricula/models/matricula.model";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../auth/services/auth";

@Component({
  selector: 'app-turma-detalhe-matricula',
  imports: [
    MatTableModule, 
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css',
  standalone: true,
})
export class MatriculasComponent {
  turmaId = input.required<number>();
  private turmaService = inject(TurmaService);
  private authService = inject(AuthService)

  matriculas$: Observable<Matricula[]> | undefined;

  ngOnInit(){
    this.matriculas$ = this.turmaService.listarMatriculas(this.turmaId());
  }

  displayedColumns: string[] = [
    'nome',
    'email',
    'acoes'
  ]; 

  usuarioProfessor(){
    return this.authService.hasRole(['prof'])
  }

}
