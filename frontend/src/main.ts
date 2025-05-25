import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Seu componente raiz
import { appConfig } from './app/app.config'; // <-- Importa e usa appConfig aqui

bootstrapApplication(AppComponent, appConfig) // <-- Deve usar appConfig
  .catch(err => console.error(err));