import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../models/Turma';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = `${environment.apiUrl}/turma`;

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  /*
  createTurma(turma: Turma): Observable<Turma> {
    return this.http.post<Turma>(this.apiUrl, turma);
  }

  getTurmaById(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.apiUrl}/${id}`);
  }

  
  updateTurma(id: number, Turma: Turma): Observable<Turma> {
    return this.http.patch<Turma>(`${this.apiUrl}/${id}`, Turma);
  }

  deleteTurma(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTurmasAtivos(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.apiUrl}/ativos`);
  }

  getTurmasPorNome(nome: string): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.apiUrl}/buscar-por-nome/${nome}`);
  }

  getTurmasPorCargaMinima(min: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.apiUrl}/carga-maior-que/${min}`);
  }
    */
}
