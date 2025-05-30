import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments'; 
import { Turma } from '../models/turma.model';
import { Matricula } from '../../matricula/models/matricula.model';
import { Atividade } from '../atividade/models/atividade.models';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = `${environment.apiUrl}/turma`;

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  listarAtividades(id:number){
    return this.http.get<Atividade[]>(`${this.apiUrl}/${id}/atividade`)
  }

  listarMatriculas(id:number){
    return this.http.get<Matricula[]>(`${this.apiUrl}/${id}/matricula`)
  }

  getById(id: number): Observable<Partial<Turma>>{
    return this.http.get<Partial<Turma>>(`${this.apiUrl}/${id}`)
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

  finOne(id: number) {
    return this.http.get<Turma>(`${this.apiUrl}/${id}`)
  }

  loadTurmasDisponiveis(): Observable<Turma[]> {
    console.log('Carregando turmas disponíveis...');
    return this.http.get<Turma[]>(this.apiUrl+'/turmas-disponiveis');
  }

}
