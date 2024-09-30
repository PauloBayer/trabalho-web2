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

@Component({
  selector: 'app-pagar',
  standalone: true,
  imports: [],
  templateUrl: './pagar.component.html',
  styleUrl: './pagar.component.css',
})
export class PagarComponent {
  constructor(public dialog: MatDialog) {}

  openDialogAccept() {
    const dialogRef = this.dialog.open(DialogContentAccept);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDecline() {
    const dialogRef = this.dialog.open(DialogContentDecline);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
export class DialogContentAccept {}
export class DialogContentDecline {
  constructor(public dialogRef: MatDialogRef<DialogContentDecline>) {}

  formGroup = new FormGroup({
    reason: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(1),
    ]),
  });

  reasonInputed: boolean = false;

  closeDialog() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.reason);
    }
  }

  inputReason() {
    this.reasonInputed = true;
  }
}
