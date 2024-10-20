import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ILoginResponse } from '../model/responses/login-response.interface';
import { IUserLogin } from '../model/requests/user-login-request.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env/environment';
import { ICliente } from '../model/entities/cliente.interface';
import { IRegistrarClienteRequest } from '../model/requests/registrar-cliente-request.interface';
import { IFuncionario } from '../model/entities/funcionario.interface';
import { seedLocalStorage } from '../seeds/seed';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = environment.httpApiUrl;

  constructor(private http: HttpClient) {}

  doLogin(data: IUserLogin): Observable<ILoginResponse> {
    seedLocalStorage();

    let clientesString = localStorage.getItem('clientes');
    let clientes: ICliente[] = clientesString ? JSON.parse(clientesString) : [];
    const clienteEncontrado = clientes.find(cliente => cliente.email === data.email && cliente.senha === data.senha);

    if (clienteEncontrado) {
      localStorage.setItem('userLogado', JSON.stringify(clienteEncontrado));
      this.setUserRole('ROLE_CLIENTE');
      return of({ token: 'fake-bearer-token' });
    }

    let funcionariosString = localStorage.getItem('funcionarios');
    let funcionarios: IFuncionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];
    const funcionarioEncontrado = funcionarios.find(funcionario => funcionario.email === data.email && funcionario.senha === data.senha);

    if (funcionarioEncontrado) {
      localStorage.setItem('userLogado', JSON.stringify(funcionarioEncontrado));
      this.setUserRole('ROLE_FUNCIONARIO');
      return of({ token: 'fake-bearer-token' });
    }

    return throwError(() => new Error('Email ou senha inválidos'));
    // return this.http.post<ILoginResponse>(`${this.endpoint}/api/v1/users/login`, data);
  }
  
  doRegister(data: IRegistrarClienteRequest): Observable<null> {
    seedLocalStorage();
    
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
    return this.getToken() && this.getUserRole() ? true : false;
  }

  setUserRole(role: 'ROLE_CLIENTE' | 'ROLE_FUNCIONARIO'): void {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): 'ROLE_CLIENTE' | 'ROLE_FUNCIONARIO' | null {
    const role = localStorage.getItem('userRole');

    if (role == 'ROLE_CLIENTE' || role == 'ROLE_FUNCIONARIO')
      return role;
    else
      return null;
  }
}
