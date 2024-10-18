import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUserLogin } from '../../model/requests/user-login-request.interface';
import { ILoginResponse } from '../../model/responses/login-response.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { clientesSeed, funcionariosSeed, solicitacoesSeed } from '../../seeds/seed';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<{
    email: FormControl<string>;
    senha: FormControl<string>;
  }>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private route: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      senha: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) 
      this.router.navigate(['']);
  }

  onLogin() {
    if (!this.loginForm.valid) return;

    const user: IUserLogin = this.loginForm.getRawValue();
    this.authService.doLogin(user).subscribe({
      next: (data: ILoginResponse) => {
        console.log(data)
        this.authService.setToken(data.token);
        this.router.navigate(['client']);
      },
      error: (error) => {
        alert('erro ao fazer login')
        console.error(error)
      }
    });
  }
}
