import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  template: `<app-layout></app-layout>`,  // Renderiza o layout aqui
})
export class AppComponent {}
