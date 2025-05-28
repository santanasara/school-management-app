// src/app/services/material.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material, TipoMaterial } from '../models/material.model';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = `${environment.apiUrl}/materiais`;
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  getByDisciplina(disciplinaId: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/por-disciplina/${disciplinaId}`);
  }

  getByTipo(tipo: TipoMaterial): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/por-tipo/${tipo}`);
  }

  getByTitulo(titulo: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/por-titulo/${titulo}`);
  }

  buscarComFiltros(
    tipo?: string,
    disciplinaId?: number,
    titulo?: string
  ): Observable<Material[]> {
    let params = new HttpParams();
    if (tipo) params = params.set('tipo', tipo);
    if (disciplinaId) params = params.set('disciplinaId', disciplinaId.toString());
    if (titulo) params = params.set('titulo', titulo);

    return this.http.get<Material[]>(`${this.apiUrl}/buscar`, { params });
  }

  create(material: Partial<Material>): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  update(id: number, material: Partial<Material>): Observable<Material> {
    return this.http.patch<Material>(`${this.apiUrl}/${id}`, material);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
