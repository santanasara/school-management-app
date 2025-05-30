import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoginComponent } from './modules/auth/components/login';
import { UnauthorizedComponent } from './modules/auth/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  // Rotas para a funcionalidade de Notas
  {
    path: 'notas',
    loadComponent: () =>
      import('./modules/nota/components/nota-shell/nota-shell.component')
        .then(m => m.NotaShellComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./modules/nota/components/nota-list/nota-list.component')
            .then(m => m.NotaListComponent)
      },
      {
        path: 'novo/:id',
        loadComponent: () =>
          import('./modules/nota/components/nota-create/nota-create.component')
        .then(m => m.NotaCreateComponent)
      },
      /*
      
      {
        path: ':id', 
        loadComponent: () =>
          import('./modules/matricula/components/matricula-details/matricula-details.component')
        .then(m => m.MatriculaDetailsComponent)
        },
        */

      
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
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
      {
        path: ':id', 
        loadComponent: () =>
          import('./modules/matricula/components/matricula-details/matricula-details.component')
        .then(m => m.MatriculaDetailsComponent)
        },

      
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  // ROTAS DE CURSOS
  {
    canActivate: [AuthGuard],
    path: 'cursos',
    loadComponent: () =>
      import('./modules/curso/components/curso-shell/curso-shell.component').then(m => m.CursoShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/curso/components/curso-list/curso-list.component').then(m => m.CursoListComponent)
      },
      {
        canActivate: [AuthGuard],
        data: {
          role: ['admin', 'prof']
        },
        path: 'novo',
        loadComponent: () =>
          import('./modules/curso/components/curso-create/curso-create.component').then(m => m.CursoCreateComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./modules/curso/components/curso-details/curso-details.component').then(m => m.CursoDetailsComponent)
      },
      {
        canActivate: [AuthGuard],
        data: {
          role: ['admin', 'prof']
        },
        path: 'editar/:id',
        loadComponent: () =>
          import('./modules/curso/components/curso-edit/curso-edit.component').then(m => m.CursoEditComponent)
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },

  // ROTAS DE DISCIPLINAS
  {
    canActivate: [AuthGuard],
    path: 'disciplinas',
    loadComponent: () =>
      import('./modules/disciplina/components/disciplina-shell/disciplina-shell.component').then(m => m.DisciplinaShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/disciplina/components/disciplina-list/disciplina-list.component').then(m => m.DisciplinaListComponent)
      },
      {
        canActivate: [AuthGuard],
        data: {
          role: ['admin', 'prof']
        },
        path: 'novo',
        loadComponent: () =>
          import('./modules/disciplina/components/disciplina-form/disciplina-form.component').then(m => m.DisciplinaFormComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./modules/disciplina/components/disciplina-details/disciplina-detais.component').then(m => m.DisciplinaDetailsComponent)
      },
      {
        canActivate: [AuthGuard],
        data: {
          role: ['admin', 'prof']
        },
        path: 'editar/:id',
        loadComponent: () =>
          import('./modules/disciplina/components/disciplina-form/disciplina-form.component').then(m => m.DisciplinaFormComponent)
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },

  // ROTAS DE MATRÍCULAS
  {
    canActivate: [AuthGuard],
    path: 'matriculas',
    loadComponent: () =>
      import('./modules/matricula/components/matricula-shell/matricula-shell.component').then(m => m.MatriculaShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/matricula/components/matricula-list/matricula-list.component').then(m => m.MatriculaListComponent)
      },
      {
        path: 'novo',
        loadComponent: () =>
          import('./modules/matricula/components/matricula-create/matricula-create.component').then(m => m.MatriculaCreateComponent)
      },
      // {
      //   path: ':id',
      //   loadComponent: () =>
      //     import('./modules/matricula/components/matricula-details/matricula-details.component').then(m => m.MatriculaDetailsComponent)
      // },
      {
        path: 'editar/:id',
        loadComponent: () =>
          import('./modules/matricula/components/matricula-create/matricula-create.component').then(m => m.MatriculaCreateComponent)
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    canActivate: [AuthGuard],
    path: 'turmas',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/turma/turma.component')
            .then(m => m.TurmaComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./modules/turma/turma-detalhe/turma-detalhe.component')
            .then(m => m.TurmaDetalheComponent),
      },
    ]
  },

  // REDIRECIONAMENTO PADRÃO
  {
    path: '',
    redirectTo: 'cursos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'cursos',
    pathMatch: 'full'
  }
];
