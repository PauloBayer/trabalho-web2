import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { LoginResponse } from '../model/responses/login-response';
import { UserLogin } from '../model/requests/user-login-request';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../env/environment';
import { Cliente } from '../model/entities/cliente';
import { RegistrarClienteRequest } from '../model/requests/registrar-cliente-request';
import { Funcionario } from '../model/entities/funcionario';
import { seedLocalStorage } from '../seeds/seed';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/users/registrar';
  endpoint: string = environment.httpApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  doLogin(data: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.endpoint}/api/v1/users/login`,
      data
    );
  }

  doRegister(formData: any): Observable<any | null> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp.status === 201) {
          return resp.body;
        } else {
          return null;
        }
      }),
      catchError((error, caught) => {
        return throwError(() => error);
      })
    );
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

    if (role == 'ROLE_CLIENTE' || role == 'ROLE_FUNCIONARIO') return role;
    else return null;
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
