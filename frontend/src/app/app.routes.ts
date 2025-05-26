import { Routes } from '@angular/router';

export const routes: Routes = [

  // Rotas para a funcionalidade de Matrícula
  {
    path: 'matriculas',
    loadComponent: () =>
      import('./modules/matricula/components/matricula-shell/matricula-shell.component')
        .then(m => m.MatriculaShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/matricula/components/matricula-list/matricula-list.component')
            .then(m => m.MatriculaListComponent)
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./modules/matricula/components/matricula-create/matricula-create.component')
        .then(m => m.MatriculaCreateComponent)
      },
        /*
      {
        path: ':id', 
        loadComponent: () =>
          import('./modules/curso/components/matricula-details/matricula-details.component')
            .then(m => m.CursoDetailsComponent)
      },
      {
        path: 'editar/:id', 
        loadComponent: () =>
          import('./modules/curso/components/matricula-edit/matricula-edit.component')
            .then(m => m.CursoEditComponent)
      },
      */
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  // Rotas para a funcionalidade de Cursos
  {
    path: 'cursos', // Rota pai para todos os recursos de cursos
    loadComponent: () =>
      import('./modules/curso/components/curso-shell/curso-shell.component')
        .then(m => m.CursoShellComponent),
    children: [
      {
        path: '', // Rota padrão para /cursos (lista de cursos)
        loadComponent: () =>
          import('./modules/curso/components/curso-list/curso-list.component')
            .then(m => m.CursoListComponent)
      },
      {
        path: 'novo', // Rota para /cursos/novo
        loadComponent: () =>
          import('./modules/curso/components/curso-create/curso-create.component')
            .then(m => m.CursoCreateComponent)
      },
      {
        path: ':id', // Rota para /cursos/:id (detalhes de um curso específico)
        loadComponent: () =>
          import('./modules/curso/components/curso-details/curso-details.component')
            .then(m => m.CursoDetailsComponent)
      },
      {
        path: 'editar/:id', // Rota para /cursos/editar/:id
        loadComponent: () =>
          import('./modules/curso/components/curso-edit/curso-edit.component')
            .then(m => m.CursoEditComponent)
      },
      // Redireciona para a lista se a URL não for correspondida em 'cursos'
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },

  // Rota curinga para qualquer URL não encontrada
  { path: '**', redirectTo: '' }
];