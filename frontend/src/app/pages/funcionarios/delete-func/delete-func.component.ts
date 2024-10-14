import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-func',
  standalone: true,
  imports: [],
  templateUrl: './delete-func.component.html',
  styleUrl: './delete-func.component.css',
})
export class DeleteFuncComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFuncComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
