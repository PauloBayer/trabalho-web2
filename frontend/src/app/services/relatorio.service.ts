// relatorio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CategoriaEquipamento } from '../model/entities/categoria-equipamento';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl: string = environment.httpApiUrl

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllCategories(): CategoriaEquipamento[] {
    return JSON.parse(localStorage.getItem('categorias') || '[]');
  }

  downloadFaturamentoReport(categoriaIds: string[], startDate: string | null, endDate: string | null): Observable<Blob> {
    let params = new HttpParams();

    if (categoriaIds && categoriaIds.length > 0) {
      params = params.set('categoriaIds', categoriaIds.join(','));
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });

    console.log(params);

    return this.http.get(`${this.apiUrl}/api/reports/faturamento`, { params: params, headers: headers, responseType: 'blob' });
  }
}
