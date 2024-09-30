import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.css',
})
export class PagarComponent {
  constructor(public dialog: MatDialog) {}

  formPagar: FormGroup = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(16),
    ]),
    vality: new FormControl(null, [Validators.required]),
    cvv: new FormControl(null, [Validators.required]),
  });
  openDialogDecline() {}
}
