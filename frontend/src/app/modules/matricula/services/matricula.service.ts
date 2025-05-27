import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../models/Matricula';
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
    return this.http.post<Matricula>(this.apiUrl, Matricula);
  }

  /*
  getMatriculaById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiUrl}/${id}`);
  }

  
  updateMatricula(id: number, Matricula: Matricula): Observable<Matricula> {
    return this.http.patch<Matricula>(`${this.apiUrl}/${id}`, Matricula);
  }

  deleteMatricula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMatriculasAtivos(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiUrl}/ativos`);
  }

  getMatriculasPorNome(nome: string): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiUrl}/buscar-por-nome/${nome}`);
  }

  getMatriculasPorCargaMinima(min: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(`${this.apiUrl}/carga-maior-que/${min}`);
  }
    */
}
