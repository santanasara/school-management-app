import { Component,  inject, input} from "@angular/core";
import { TurmaService } from "../../services/turma.service";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Observable, } from "rxjs";
import { Matricula } from "../../../matricula/models/matricula.model";

@Component({
  selector: 'app-turma-detalhe-matricula',
  imports: [MatTableModule, CommonModule],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css'
})
export class MatriculasComponent {
  turmaId = input.required<number>();
  private turmaService = inject(TurmaService);

  matriculas$: Observable<Matricula[]> | undefined;

  ngOnInit(){
    this.matriculas$ = this.turmaService.listarMatriculas(this.turmaId());
  }

  displayedColumns: string[] = [
    'nome',
    'email',
  ]; 

}
