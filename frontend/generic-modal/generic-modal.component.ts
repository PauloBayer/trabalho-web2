import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css'],
})
export class GenericModalComponent {
  solicitacaoForm: FormGroup;
  modalData = {
    id: '12345',
    valor: 'R$300,00',
    descricao: 'Pagamento de serviço X',
  };

  @Output() close = new EventEmitter<void>();
  showModal: boolean = false;
  submit: boolean = false;

  constructor(private fb: FormBuilder) {
    // Inicialização do FormGroup no construtor
    this.solicitacaoForm = this.fb.group({
      numero: ['', Validators.required],
      validade: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  confirmPayment() {
    this.submit = true;
    if (this.solicitacaoForm.valid) {
      alert('Pagamento confirmado!');
      this.closeModal();
    }
  }
}
