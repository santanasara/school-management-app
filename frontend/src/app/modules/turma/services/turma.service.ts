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

  listar(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  criar(turma: Omit<Turma, 'id'>): Observable<Turma> {
    return this.http.post<Turma>(this.apiUrl, turma);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  alterar(id: number, turma: Partial<Turma>): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/${id}`, turma);
  }

}
