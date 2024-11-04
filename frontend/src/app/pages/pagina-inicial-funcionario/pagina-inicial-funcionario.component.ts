import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Router } from '@angular/router';
import { Solicitacao } from '../../model/entities/solicitacao';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-inicial-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrls: ['./pagina-inicial-funcionario.component.css'],
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  filterValue: string = '';

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.solicitacaoService.findAllSolicitacoesWithStatusABERTA().subscribe({
      next: (data: Solicitacao[]) => {
        this.solicitacoes = data;
      },
      error: (error) => {
        alert(`ERRO: ${error}`);
      },
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

  efetuarOrcamento(idSolicitacao: string) {
    this.router.navigate([`funcionario/efetuar-orcamento/${idSolicitacao}`]);
  }

  visualizarServico(idSolicitacao: string) {
    this.router.navigate([`funcionario/solicitacao/${idSolicitacao}`]);
  }

  goToGerenciarSolicitacoes() {
    this.router.navigate(['funcionario/gerenciar-solicitacoes']);
  }
}
