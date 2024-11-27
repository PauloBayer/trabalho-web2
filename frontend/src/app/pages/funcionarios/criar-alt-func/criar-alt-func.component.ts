import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-criar-alt-func',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaskDirective,
  ],
  templateUrl: './criar-alt-func.component.html',
  styleUrl: './criar-alt-func.component.css',
})
export class CriarAltFuncComponent {
  form: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<CriarAltFuncComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: [data?.funcionario?.nome || '', Validators.required],
      email: [
        data?.funcionario?.email || '',
        [Validators.required, Validators.email],
      ],
      dataNascimento: [
        data?.funcionario?.dataNascimento || '',
        [Validators.required, this.dateLengthValidator],
      ],
      senha: [data?.funcionario?.senha || '', Validators.required],
    });
  }

  dateLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length !== 8) {
      return { invalidDateLength: true };
    }
    return null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.value.dataNascimento = `${this.form.value.dataNascimento.substring(
        0,
        2
      )}/${this.form.value.dataNascimento.substring(
        2,
        4
      )}/${this.form.value.dataNascimento.substring(4, 8)}`;

      this.dialogRef.close(this.form.value);
    }
  }
}
