import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-criar-alt-func',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
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
      nome: [data?.funcionario?.nome || ''],
      email: [data?.funcionario?.email || ''],
      dataNascimento: [data?.funcionario?.dataNascimento || ''],
      senha: [data?.funcionario?.senha || ''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
}
