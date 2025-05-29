import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { MaterialService } from '../../services/material.service';
import { Material, TipoMaterial } from '../../models/material.model';
import { Disciplina } from '../../../disciplina/models/disciplina.model';
import { DisciplinaService } from '../../../disciplina/services/disciplina.service';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCard
  ],
  templateUrl: './material-form.component.html',
})
export class MaterialFormComponent implements OnInit {
  material: Partial<Material> = {};

  disciplinas: Disciplina[] = [];
  tipoMaterialOptions = Object.values(TipoMaterial); // ✅ ADICIONADO
  isEditMode = false;
  materialId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private disciplinaService: DisciplinaService
  ) {}

  ngOnInit(): void {
    this.disciplinaService.getAll().subscribe(d => this.disciplinas = d);

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'novo') {
      this.isEditMode = true;
      this.materialId = +idParam;
      this.materialService.getById(this.materialId).subscribe((m: Material) => {
        this.material = m;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.materialId !== null) {
      this.materialService.update(this.materialId, this.material).subscribe(() => {
        this.router.navigate(['/materiais']);
      });
    } else {
      this.materialService.create(this.material).subscribe(() => {
        this.router.navigate(['/materiais']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/materiais']);
  }
}
