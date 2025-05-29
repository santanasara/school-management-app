import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environments'; 
import { Atividade } from '../models/atividade.models';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  private apiUrl = `${environment.apiUrl}/atividade`;

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Partial<Atividade>>{
    return this.http.get<Partial<Atividade>>(`${this.apiUrl}/${id}`)
  }

  listar(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.apiUrl);
  }

  criar(Atividade: Omit<Atividade, 'id'>): Observable<Atividade> {
    return this.http.post<Atividade>(this.apiUrl, Atividade);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  alterar(id: number, Atividade: Partial<Atividade>): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/${id}`, Atividade);
  }

}
