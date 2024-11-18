import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Funcionario } from '../model/entities/funcionario';
import { environment } from '../env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl: string = environment.httpApiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  create(
    email: string,
    nome: string,
    dataNascimento: string,
    senha: string
  ): Observable<null> {
    const funcionario: Funcionario = {
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      senha: senha,
    };

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.post<null>(
      `${this.apiUrl}/api/v1/funcionarios`,
      funcionario,
      { headers: headers }
    );
  }

  findById(id: number): Observable<Funcionario> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.get<Funcionario>(
      `${this.apiUrl}/api/v1/funcionarios/${id}`,
      { headers: headers }
    );
  }

  findAll(): Observable<Funcionario[]> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.get<Funcionario[]>(
      `${this.apiUrl}/api/v1/funcionarios`,
      { headers: headers }
    );
  }

  deleteById(id: number): Observable<null> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.delete<null>(
      `${this.apiUrl}/api/v1/funcionarios/${id}`,
      { headers: headers }
    );
  }

  updateById(
    id: number,
    email: string,
    nome: string,
    dataNascimento: string,
    senha: string
  ): Observable<null> {
    const funcionario: Funcionario = {
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      senha: senha,
    };

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(
      `${this.apiUrl}/api/v1/funcionarios/${id}`,
      funcionario,
      { headers: headers }
    );
  }
}
