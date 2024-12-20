// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CategoriaEquipamento } from '../model/entities/categoria-equipamento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string = environment.httpApiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCategories(): Observable<CategoriaEquipamento[]> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.get<CategoriaEquipamento[]>(
      `${this.apiUrl}/api/v1/categorias-equipamento`,
      { headers: headers }
    );
  }

  addCategory(category: CategoriaEquipamento): Observable<null> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.post<null>(
      `${this.apiUrl}/api/v1/categorias-equipamento`,
      category,
      { headers: headers }
    );
  }

  updateCategory(
    id: number,
    updatedCategory: CategoriaEquipamento
  ): Observable<null> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(
      `${this.apiUrl}/api/v1/categorias-equipamento/${id}`,
      updatedCategory,
      { headers: headers }

    );
  }

  deleteCategory(id: number): Observable<null> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.delete<null>(
      `${this.apiUrl}/api/v1/categorias-equipamento/${id}`,
      { headers: headers }
    );
  }
}
