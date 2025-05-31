import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/services/auth';
import { TurmaService } from './turma.service';
import { Turma } from '../models/turma.model';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipanteTurmaGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private turmaService: TurmaService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const idTurma = +route.params['id'];

    if (this.authService.hasRole(['prof', 'aluno'])) {
      return this.turmaService.listar().pipe(
        map(turmas => turmas.some(turma => turma.id === idTurma)),
        tap((permitido: any) => {
          if (!permitido) {
            this.router.navigate(['/unauthorized']);
          }
        }),
        catchError(() => {
          this.router.navigate(['/unauthorized']);
          return of(false);
        })
      );
    } else {
      return of(true); // outras funções podem acessar
    }
  }
}