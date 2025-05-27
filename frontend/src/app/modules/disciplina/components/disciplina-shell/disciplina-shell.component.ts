import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-disciplina-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
    <div>
      <nav class="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol class="list-reset flex items-center space-x-1">
          <li>
            <a href="/" class="hover:text-indigo-600 transition">Início</a>
            <span class="mx-1">/</span>
          </li>
          <li>
            <a href="/disciplinas" class="hover:text-indigo-600 transition">Disciplinas</a>
            <span class="mx-1">/</span>
          </li>
          <li class="text-indigo-600 font-medium">Gerenciar</li>
        </ol>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class DisciplinaShellComponent {
}
