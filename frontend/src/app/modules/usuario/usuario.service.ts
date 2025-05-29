import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments'; 
import { Usuario } from './models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  listarProfessores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/professor`);
  }

  criar(turma: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, turma);
  }

  remover(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  alterar(id: number, turma: Partial<Usuario>): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/${id}`, turma);
  }

}
