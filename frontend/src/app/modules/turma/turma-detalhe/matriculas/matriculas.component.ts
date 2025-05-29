import { Component, computed, inject, input } from "@angular/core";
import { TurmaService } from "../../services/turma.service";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { of } from "rxjs";

@Component({
  selector: 'app-turma-detalhe-matricula',
  imports: [MatTableModule, CommonModule],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css'
})
export class MatriculasComponent {
  turmaId = input.required<number>();
  
  private turmaService = inject(TurmaService);
    matriculas$ = computed(() => {
    const id = this.turmaId();
    return id != null ? this.turmaService.listarMatriculas(id) : of([]);
  })();

    displayedColumns: string[] = [
    'nome',
    'email',
  ]; 

}
