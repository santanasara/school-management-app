import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disciplina } from '../models/disciplina.model';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root',
})
export class DisciplinaService {
  private apiUrl = `${environment.apiUrl}/disciplinas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  getById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByLocal(local: string): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/local/${local}`);
  }

  getByInstrutor(instrutorId: number): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/instrutor/${instrutorId}`);
  }

  getByNome(nome: string): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/nome/${nome}`);
  }
}
