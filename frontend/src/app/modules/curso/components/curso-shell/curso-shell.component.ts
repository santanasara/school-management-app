// src/app/modules/curso/components/curso-shell/curso-shell.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Importe RouterOutlet para as rotas filhas

@Component({
  selector: 'app-curso-shell',
  standalone: true, // É um componente standalone
  imports: [
    CommonModule,
    RouterOutlet // Permite que os componentes filhos sejam renderizados aqui
  ],
  template: `
    <div class="curso-container">
      <h2>Gerenciamento de Cursos</h2>
      <router-outlet></router-outlet> </div>
  `,
  styles: [`
    .curso-container {
      padding: 20px;
      margin: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    h2 {
      color: #3f51b5;
      margin-bottom: 20px;
      border-bottom: 2px solid #3f51b5;
      padding-bottom: 10px;
    }
  `]
})
export class CursoShellComponent {
  // Este componente atua como um contêiner para as rotas filhas de curso.
  // Sua lógica principal é apenas conter o <router-outlet>.
}