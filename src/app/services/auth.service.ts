import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILoginResponse } from '../model/interfaces/login-response.interface';
import { IUserLogin } from '../model/interfaces/user-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  doLogin(data: IUserLogin): Observable<ILoginResponse> {
    return of({ token: "faketoken" });
  }
  
  doRegister(data: any): Observable<null> {
    return of(null);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }
}
