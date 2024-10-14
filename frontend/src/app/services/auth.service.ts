import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILoginResponse } from '../model/interfaces/login-response.interface';
import { IUserLogin } from '../model/interfaces/user-login.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:8080/api/v1/users/';

  constructor(
    private http: HttpClient
  ) {}

  doLogin(data: IUserLogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.endpoint}/login`, data);
  }
  
  doRegister(data: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/registrar`, data);
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
