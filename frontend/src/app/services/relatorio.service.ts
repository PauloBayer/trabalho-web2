import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { AuthService } from './auth.service';
import { Receita } from '../model/entities/receita';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl: string = environment.httpApiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllCategories(): Observable<any[]> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });

    return this.http.get<any[]>(`${this.apiUrl}/api/v1/categorias-equipamento`, { headers: headers });
  }

  getAllPagamentos(): Observable<Receita[]> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });

    console.log('Bearer token:', bearerToken);

    return this.http.get<Receita[]>(`${this.apiUrl}/api/reports/pagamentos`, { headers: headers });
  }

  downloadFaturamentoReport(categoria: string, startDate: string | null, endDate: string | null): Observable<Blob> {
    let params = new HttpParams();

    if (categoria) {
        params = params.append('categoria', categoria);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });

    return this.http.get(`${this.apiUrl}/api/reports/faturamento`, { params: params, headers: headers, responseType: 'blob' });
  }
}
