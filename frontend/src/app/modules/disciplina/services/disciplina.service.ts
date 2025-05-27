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

  findAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  findOne(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  create(disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }

  update(id: number, disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.apiUrl}/${id}`, disciplina);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findByNome(nome: string): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/nome/${nome}`);
  }
}