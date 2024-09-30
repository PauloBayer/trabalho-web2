import { Component, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mostrar-orcamentos',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './mostrar-orcamentos.component.html',
  styleUrl: './mostrar-orcamentos.component.css'
})
export class MostrarOrcamentosComponent {

  constructor(public dialog: MatDialog) {}

  readonly panelOpenState = signal(false);

  openDialogAccept() {
    const dialogRef = this.dialog.open(DialogContentAccept);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDecline() {
    const dialogRef = this.dialog.open(DialogContentDecline);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-accept-orcamento',
  templateUrl: './components/dialog-accept-orcamento.html',
  styleUrls: ['./components/dialog-accept-orcamento.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule
  ],
})
export class DialogContentAccept {}

@Component({
  selector: 'dialog-decline-orcamento',
  templateUrl: './components/dialog-decline-orcamento.html',
  styleUrls: ['./components/dialog-decline-orcamento.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class DialogContentDecline {

  constructor(public dialogRef: MatDialogRef<DialogContentDecline>) {}

  formGroup = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(1)])
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