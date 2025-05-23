import { Component } from '@angular/core';
import { CursoService } from '../app/services/curso.service';
import { FormsModule } from '@angular/forms';
import { CursoComponent } from './components/curso/curso.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CursoComponent],
  template: `<app-curso></app-curso>`
})


export class AppComponent {}

