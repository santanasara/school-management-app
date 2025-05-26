// src/app/modules/curso/services/curso.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.patch<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCursosAtivos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/ativos`);
  }

  getCursosPorNome(nome: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/buscar-por-nome/${nome}`);
  }

  getCursosPorCargaMinima(min: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/carga-maior-que/${min}`);
  }
}
