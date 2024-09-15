import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Categorie {
  value: string;
  view: string;
}

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitacao-manutencao.component.html',
  styleUrl: './solicitacao-manutencao.component.css',
})
export class SolicitacaoManutencaoComponent implements OnInit {
  title = 'solicitacao-manutencao';
  categories: Categorie[] = [
    { value: 'notebook', view: 'Notebook' },
    { value: 'desktop', view: 'Desktop' },
    { value: 'impressora', view: 'Impressora' },
    { value: 'mouse', view: 'Mouse' },
    { value: 'teclado', view: 'Teclado' },
  ];

  solicitacaoForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  initializeForm() {
    this.solicitacaoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      problem: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  submit = false;

  // formSolicitacao = {
  //   name: '',
  //   description: '',
  //   categorie: '',
  //   problem: '',
  // };

  submitForm(): void {
    this.submit = true;
    if (this.solicitacaoForm.valid) {
      console.log(this.solicitacaoForm.value);
    } else {
      console.log('Validação invalida');
    }
  }
}
