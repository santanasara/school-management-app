import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments'; 
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = `${environment.apiUrl}/nota`;

  constructor(private http: HttpClient) { }

  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  createNota(Nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, Nota);
  }

  deleteNota(id: number): Observable<void> {
    console.log(`${this.apiUrl}/${id}`)
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getNotasPorNome(nome: string): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/buscar-por-nome/${nome}`);
  }

  getNotaById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }
  
  updateNota(nota: Nota): Observable<Nota> {
    return this.http.patch<Nota>(`${this.apiUrl}/${nota.id}`, nota);
  }
    /*


  

  getNotasAtivos(): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.apiUrl}/ativos`);
  }

    */
}
