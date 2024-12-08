import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginResponse } from '../model/responses/login-response';
import { UserLogin } from '../model/requests/user-login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = environment.httpApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  doLogin(data: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.endpoint}/api/v1/users/login`, data);
  }

  doRegister(formData: RegistrarClienteRequest): Observable<null> {
    return this.http.post<null>(`${this.endpoint}/api/v1/users/registrar`, formData);
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
