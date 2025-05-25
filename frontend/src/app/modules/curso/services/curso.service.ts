// src/app/modules/curso/services/curso.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // 'of' para simular dados
import { Curso } from '../curso'; 

@Injectable({
  providedIn: 'root' // Torna o serviço um singleton disponível em toda a aplicação
})
export class CursoService {

  // URL base da sua API. Substitua por sua API real se tiver uma.
  // Para fins de demonstração, usaremos um array mockado.
  private apiUrl = 'http://localhost:3000/cursos'; // Exemplo para JSON Server ou API real

  // Simulação de dados (apenas para testar sem backend real)
  private cursosMock: Curso[] = [
    { id: 1, nome: 'Desenvolvimento Web com Angular', cargaHoraria: 80},
    { id: 2, nome: 'Introdução à Programação com Python', cargaHoraria: 40},
    { id: 3, nome: 'Banco de Dados SQL Essencial', cargaHoraria: 60 }
  ];
  private nextId = 4; // Para simular novos IDs

  constructor(private http: HttpClient) { }

  // --- Métodos CRUD (usando HttpClient para API real) ---

  // Obter todos os cursos
  getCursos(): Observable<Curso[]> {
    // return this.http.get<Curso[]>(this.apiUrl); // Para API real
    return of(this.cursosMock); // Para simulação
  }

  // Obter um curso por ID
  getCursoById(id: number): Observable<Curso | undefined> {
    // return this.http.get<Curso>(`${this.apiUrl}/${id}`); // Para API real
    return of(this.cursosMock.find(curso => curso.id === id)); // Para simulação
  }

  // Criar um novo curso
  createCurso(curso: Curso): Observable<Curso> {
    // return this.http.post<Curso>(this.apiUrl, curso); // Para API real
    curso.id = this.nextId++; // Simula um novo ID
    this.cursosMock.push(curso);
    return of(curso); // Para simulação
  }

  // Atualizar um curso existente
  updateCurso(id: number, curso: Curso): Observable<Curso> {
    // return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso); // Para API real
    const index = this.cursosMock.findIndex(c => c.id === id);
    if (index > -1) {
      this.cursosMock[index] = { ...curso, id: id };
      return of(this.cursosMock[index]);
    }
    return of(curso); // Retorna o curso sem alteração se não encontrar (ou erro em API real)
  }

  // Deletar um curso
  deleteCurso(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`); // Para API real
    this.cursosMock = this.cursosMock.filter(curso => curso.id !== id);
    return of(undefined); // Para simulação
  }
}