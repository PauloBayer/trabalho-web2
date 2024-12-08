import { Component, OnInit } from '@angular/core';
import { seedLocalStorage } from '../../seeds/seed';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AsyncValidatorFn,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistrarClienteRequest } from '../../model/requests/registrar-cliente-request';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  autoCadastroForm!: FormGroup;
  senhaGerada: string | null = null;
  formSubmitted = false;
  cpfError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.autoCadastroForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern('\\d{3}\.\\d{3}\.\\d{3}-\\d{2}')]],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      logradouro: [''],
      numero: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bairro: [''],
      cidade: [''],
      estado: [''],
      telefone: ['', [Validators.required, Validators.pattern('^\\([1-9]{2}\\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$')]
      ],
    });

    this.autoCadastroForm.get('cep')?.valueChanges.subscribe((value) => {
      const numericValue = value.replace(/\D/g, '').slice(0, 8);
      this.autoCadastroForm
        .get('cep')
        ?.setValue(numericValue, { emitEvent: false });
    });
  }

  validarCPF(cpf: string): boolean {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) return false;
    const cpfArray = cpfLimpo.split('').map(Number);
    const calcularDigito = (soma: number, peso: number[]): number => {
      const resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    };
    const soma1 = cpfArray
      .slice(0, 9)
      .reduce((acc, val, idx) => acc + val * (10 - idx), 0);
    const primeiroDigito = calcularDigito(soma1, []);
    const soma2 = cpfArray
      .slice(0, 10)
      .reduce((acc, val, idx) => acc + val * (11 - idx), 0);
    const segundoDigito = calcularDigito(soma2, []);
    return cpfArray[9] === primeiroDigito && cpfArray[10] === segundoDigito;
  }

  onSubmit(): void {
    if (!this.autoCadastroForm.valid)
      return;

    this.formSubmitted = true;

    const cpf = this.autoCadastroForm.get('cpf')?.value;
    if (!this.validarCPF(cpf)) {
      this.cpfError = true;
      return;
    }

    this.cpfError = false;

    if (this.autoCadastroForm.valid) {
      const nome = this.autoCadastroForm.get('nome')?.value;
      const email = this.autoCadastroForm.get('email')?.value;
      const cep = this.autoCadastroForm.get('cep')?.value;
      const telefone = this.autoCadastroForm.get('telefone')?.value;

      const logradouro = this.autoCadastroForm.get('logradouro')?.value;
      const numero = this.autoCadastroForm.get('numero')?.value;
      const bairro = this.autoCadastroForm.get('bairro')?.value;
      const cidade = this.autoCadastroForm.get('cidade')?.value;
      const estado = this.autoCadastroForm.get('estado')?.value;
      const endereco = `${logradouro} - ${numero} - ${bairro} - ${cidade} - ${estado}`;

      const data: RegistrarClienteRequest = {
        nome: nome,
        cpf: cpf,
        email: email,
        cep: `${cep.slice(0, 5)}-${cep.slice(5)}`,
        telefone: telefone,
        endereco: endereco
      }

      console.log(data);

      this.authService.doRegister(data).subscribe({
        next: () => this.router.navigate(['login']),
        error: () => console.error("Erro ao cadastrar")
      });
    }
  }

  buscarEndereco(): void {
    const cep = this.autoCadastroForm.get('cep')?.value;
    if (cep) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        (data: any) => {
          if (data.erro) {
            this.autoCadastroForm.get('cep')?.setErrors({ validarCEP: true });
          } else {
            this.autoCadastroForm.patchValue({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf,
            });
          }
        },
        (error) => {
          console.error('Erro ao buscar o endereço:', error);
        }
      );
    }
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  voltar() {
    this.router.navigate(['']);
  }
}
