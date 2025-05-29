import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DisciplinaService } from '../../services/disciplina.service'; 
import { Disciplina } from '../../models/disciplina.model'; 
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-disciplina-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard
  ],
  templateUrl: './disciplina-form.component.html',
})
export class DisciplinaFormComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  disciplina: Partial<Disciplina> = {};
  editando = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.disciplinaService.getById(+id).subscribe((d) => (this.disciplina = d));
    }
  }

  salvar(): void {
    if (this.editando && this.disciplina.id) {
      this.disciplinaService.update(this.disciplina.id, this.disciplina).subscribe(() => this.router.navigate(['/disciplinas']));
    } else {
      this.disciplinaService.create(this.disciplina).subscribe(() => this.router.navigate(['/disciplinas']));
    }
  }
}
