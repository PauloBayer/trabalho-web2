import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { ICategoriaEquipamento } from '../../model/entities/categoria-equipamento.interface';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitacao-manutencao.component.html',
  styleUrl: './solicitacao-manutencao.component.css',
})
export class SolicitacaoManutencaoComponent implements OnInit {
  categories: ICategoriaEquipamento[] = [];
  submit = false;
  solicitacaoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.solicitacaoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      //categorie: ['', Validators.required],
      problem: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: ICategoriaEquipamento[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error) => console.error(error),
    });
  }

  submitForm(): void {
    this.submit = true;

    if (!this.solicitacaoForm.valid) return;

    const { categorie, problem, name, description } =
      this.solicitacaoForm.value;

    this.solicitacaoService
      .criarSolicitacao(description, problem, categorie)
      .subscribe({
        next: (data) => {
          this.router.navigate(['client/manutencao']);
        },
        error: (error) => {
          // arrumar mensagem de erro
          alert('something went wrong');
          console.error(error);
        },
      });
  }
}
