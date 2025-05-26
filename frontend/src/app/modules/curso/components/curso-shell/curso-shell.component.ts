import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-curso-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
    <div class="p-5 m-5 border border-gray-300 rounded-lg bg-gray-50">
      <h2 class="text-indigo-600 mb-5 border-b-2 border-indigo-600 pb-2 text-xl font-semibold">
        Gerenciamento de Cursos
      </h2>
      <router-outlet></router-outlet>
    </div>
  `
})
export class CursoShellComponent {
}
