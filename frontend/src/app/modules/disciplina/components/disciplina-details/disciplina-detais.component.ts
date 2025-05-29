import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DisciplinaService } from '../../services/disciplina.service'; 
import { Disciplina } from '../../models/disciplina.model'; 

@Component({
  selector: 'app-disciplina-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './disciplina-details.component.html',
})
export class DisciplinaDetailsComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private route = inject(ActivatedRoute);

  disciplina?: Disciplina;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.disciplinaService.getById(+id).subscribe((d) => (this.disciplina = d));
    }
  }
}
