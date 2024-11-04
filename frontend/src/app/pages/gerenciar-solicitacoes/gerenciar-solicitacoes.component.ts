import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitacao } from '../../model/entities/solicitacao';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-gerenciar-solicitacoes',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    HttpClientModule, 
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './gerenciar-solicitacoes.component.html',
  styleUrl: './gerenciar-solicitacoes.component.css'
})
export class GerenciarSolicitacoesComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  filterValue: string = '';

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.solicitacaoService.findAllSolicitacoes().subscribe({
      next: (data: Solicitacao[]) => {
        this.solicitacoes = data;
      },
      error: (error) => console.error(error),
    });
  }

  get filteredSolicitacoes(): Solicitacao[] {
    if (!this.filterValue) {
      return this.solicitacoes;
    }
    const filterValueLower = this.filterValue.toLowerCase();
    return this.solicitacoes.filter((solicitacao) => {
      const id = solicitacao.id.toLowerCase();
      const clienteNome = solicitacao.cliente?.nome?.toLowerCase() || '';
      const status = solicitacao.status?.toLowerCase() || '';
      const descricaoDefeito = solicitacao.descricaoDefeito?.toLowerCase() || '';

      return (
        id.includes(filterValueLower) ||
        clienteNome.includes(filterValueLower) ||
        status.includes(filterValueLower) ||
        descricaoDefeito.includes(filterValueLower)
      );
    }
  )};

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}h${minutes}`;
  }

  finalizarSolicitacao(idSolicitacao: string) {
    this.router.navigate([`funcionario/finalizar/${idSolicitacao}`]);
  }

  efetuarOrcamento(idSolicitacao: string) {
    this.router.navigate([`funcionario/efetuar-orcamento/${idSolicitacao}`]);
  }
  
  visualizarServico(idSolicitacao: string) {
    this.router.navigate([`funcionario/solicitacao/${idSolicitacao}`]);
  }

  efetuarManutencao(idSolicitacao: string) {
    this.router.navigate([`funcionario/manutencao/${idSolicitacao}`]);
  }

  goToSolicitacoesAbertas() {
    this.router.navigate(['funcionario']);
  }
}
