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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.autoCadastroForm = this.fb.group({
      cpf: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{11}$')],
        [this.cpfAsyncValidator()],
      ],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      logradouro: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
      telefone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });

    // Formatar CPF e CEP
    this.autoCadastroForm.get('cpf')?.valueChanges.subscribe((value) => {
      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      this.autoCadastroForm
        .get('cpf')
        ?.setValue(numericValue, { emitEvent: false });
    });

    this.autoCadastroForm.get('cep')?.valueChanges.subscribe((value) => {
      const numericValue = value.replace(/\D/g, '').slice(0, 8);
      this.autoCadastroForm
        .get('cep')
        ?.setValue(numericValue, { emitEvent: false });
    });
  }

  cpfAsyncValidator(): AsyncValidatorFn {
    return (control: any): Observable<any> => {
      const cpf = control.value.replace(/\D/g, '');
      if (cpf && this.validarCPF(cpf)) {
        return of(null);
      } else {
        return of({ invalidCpf: true });
      }
    };
  }

  validarCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    const cpfArray = cpf.split('').map(Number);

    const calcularDigito = (soma: number, peso: number[]) => {
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
    this.formSubmitted = true;
    const cpf = this.autoCadastroForm.get('cpf')?.value.replace(/\D/g, '');
    if (!this.validarCPF(cpf)) {
      this.autoCadastroForm.get('cpf')?.setErrors({ validarCPF: true });
      return;
    }
  
    if (this.autoCadastroForm.valid) {
      this.senhaGerada = Math.floor(1000 + Math.random() * 9000).toString();
      const formData = this.autoCadastroForm.value;
      formData.senha = this.senhaGerada;  
      this.authService.doRegister(formData).subscribe(
        () => {
          this.router.navigate(['login']);
        },
        (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      );
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
}
