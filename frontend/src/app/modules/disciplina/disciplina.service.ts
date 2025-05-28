import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments'; 
import { Disciplina } from './Disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private apiUrl = `${environment.apiUrl}/disciplina`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  criar(turma: Omit<Disciplina, 'id'>): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, turma);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  alterar(id: number, turma: Partial<Disciplina>): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/${id}`, turma);
  }

}
