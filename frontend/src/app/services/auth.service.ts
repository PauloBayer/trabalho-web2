import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ILoginResponse } from '../model/responses/login-response.interface';
import { IUserLogin } from '../model/requests/user-login-request.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../env/environment';
import { ICliente } from '../model/entities/cliente.interface';
import { IRegistrarClienteRequest } from '../model/requests/registrar-cliente-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = environment.httpApiUrl;

  constructor(private http: HttpClient) {
    let clientesString = localStorage.getItem('clientes');
    let clientes: ICliente[] = clientesString ? JSON.parse(clientesString) : [];

    if (clientes.length === 0) {
      clientes.push({ id: Math.random(), cpf: '123.456.789-00', nome: 'João Silva', email: 'joao.silva@email.com', endereco: 'Rua das Flores, 123', telefone: '(11) 91234-5678', cep: '01001-000', senha: '1234' });
      clientes.push({ id: Math.random(), cpf: '987.654.321-00', nome: 'José Pereira', email: 'jose.pereira@email.com', endereco: 'Avenida Paulista, 456', telefone: '(11) 98765-4321', cep: '01310-100', senha: '1234' });
      clientes.push({ id: Math.random(), cpf: '196.885.590-40', nome: 'cliente', email: 'cliente@email.com', endereco: 'Avenida Paulista, 456', telefone: '(11) 98765-4321', cep: '01310-100', senha: '1234' });
      clientes.push({ id: Math.random(), cpf: '456.123.789-00', nome: 'Joana Souza', email: 'joana.souza@email.com', endereco: 'Rua das Palmeiras, 789', telefone: '(21) 91234-5678', cep: '20031-050', senha: '1234' });
      clientes.push({ id: Math.random(), cpf: '321.654.987-00', nome: 'Joaquina Oliveira', email: 'joaquina.oliveira@email.com', endereco: 'Rua da Liberdade, 101', telefone: '(21) 98765-4321', cep: '20220-150', senha: '1234' });
    }

    localStorage.setItem('clientes', JSON.stringify(clientes));
  }

  doLogin(data: IUserLogin): Observable<ILoginResponse> {
    let clientesString = localStorage.getItem('clientes');
    let clientes: ICliente[] = clientesString ? JSON.parse(clientesString) : [];

    const clienteEncontrado = clientes.find(cliente => 
      cliente.email === data.email && cliente.senha === data.senha
    );

    if (!clienteEncontrado)
      return throwError(() => new Error('Email ou senha inválidos'));

    return of({ token: 'fake-bearer-token' });
    // return this.http.post<ILoginResponse>(`${this.endpoint}/api/v1/users/login`, data);
  }
  
  doRegister(data: IRegistrarClienteRequest): Observable<null> {
    let clientesString = localStorage.getItem('clientes');
    let clientes: ICliente[] = clientesString ? JSON.parse(clientesString) : [];

    clientes.push({
      id: Math.random(),
      cpf: data.cpf,
      nome: data.nome,
      email: data.email,
      endereco: data.endereco,
      telefone: data.telefone,
      cep: data.cep,
      senha: '1234'
    });

    localStorage.setItem('clientes', JSON.stringify(clientes));

    return of(null);
    // return this.http.post<any>(`${this.endpoint}/api/v1/users/registrar`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }
}
