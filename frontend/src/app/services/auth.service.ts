import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginResponse } from '../model/responses/login-response';
import { UserLogin } from '../model/requests/user-login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env/environment';
import { Cliente } from '../model/entities/cliente';
import { RegistrarClienteRequest } from '../model/requests/registrar-cliente-request';
import { Funcionario } from '../model/entities/funcionario';
import { seedLocalStorage } from '../seeds/seed';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = environment.httpApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  doLogin(data: UserLogin): Observable<LoginResponse> {
    seedLocalStorage();

    let clientesString = localStorage.getItem('clientes');
    let clientes: Cliente[] = clientesString ? JSON.parse(clientesString) : [];
    const clienteEncontrado = clientes.find(cliente => cliente.email === data.email && cliente.senha === data.senha);

    if (clienteEncontrado) {
      localStorage.setItem('userLogado', JSON.stringify(clienteEncontrado));
      this.setUserRole('ROLE_CLIENTE');
      return of({ token: 'fake-bearer-token' });
    }

    let funcionariosString = localStorage.getItem('funcionarios');
    let funcionarios: Funcionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];
    const funcionarioEncontrado = funcionarios.find(funcionario => funcionario.email === data.email && funcionario.senha === data.senha);

    if (funcionarioEncontrado) {
      localStorage.setItem('userLogado', JSON.stringify(funcionarioEncontrado));
      this.setUserRole('ROLE_FUNCIONARIO');
      return of({ token: 'fake-bearer-token' });
    }

    return throwError(() => new Error('Email ou senha inválidos'));
    // return this.http.post<LoginResponse>(`${this.endpoint}/api/v1/users/login`, data);
  }
  
  doRegister(data: RegistrarClienteRequest): Observable<null> {
    seedLocalStorage();
    
    let clientesString = localStorage.getItem('clientes');
    let clientes: Cliente[] = clientesString ? JSON.parse(clientesString) : [];

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

  navigateToHomepageByRole() {
    const role = this.getUserRole();

    if (role === 'ROLE_CLIENTE') {
      this.router.navigate(['client']);
      return;
    }

    if (role === 'ROLE_FUNCIONARIO') {
      this.router.navigate(['funcionario']);
      return;
    }

    this.router.navigate(['']);
  }
}
