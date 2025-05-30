import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Matricula } from '../models/matricula.model';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private apiUrl = `${environment.apiUrl}/matricula`;

  constructor(private http: HttpClient) { }

  getMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }

  createMatricula(Matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, Matricula).pipe(
    catchError(error => {
      console.error('Erro ao criar matrícula:', error);
      return throwError(() => error); // reemite o erro para ser tratado por quem consome
    })
  );
  }

  deleteMatricula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMatriculasPorNome(nome: string): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiUrl}/buscar-por-nome/${nome}`);
  }

  getMatriculasPorTurma(id: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiUrl}/buscar-por-turma/${id}`);
  }

  getMatriculaById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiUrl}/${id}`);
  }
  
  updateMatricula(id: number, Matricula: Matricula): Observable<Matricula> {
    return this.http.patch<Matricula>(`${this.apiUrl}/${id}`, Matricula);
  }
    /*


  

  getMatriculasAtivos(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiUrl}/ativos`);
  }

    */
}
