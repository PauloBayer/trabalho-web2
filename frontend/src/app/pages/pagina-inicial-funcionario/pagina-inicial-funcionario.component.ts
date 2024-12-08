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
  filteredSolicitacoes: Solicitacao[] = [];
  filterValue: string = '';

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.loadSolicitacoes();
  }

  loadSolicitacoes(): void {
    this.solicitacaoService.findAllSolicitacoes().subscribe({
      next: (data: Solicitacao[]) => {
        this.solicitacoes = [...data];
        this.updateFilteredSolicitacoes();
      },
      error: (error) => {
        alert(`ERRO: ${error}`);
      },
    });
  }

  updateFilteredSolicitacoes(): void {
    if (!this.filterValue) {
      this.filteredSolicitacoes = [...this.solicitacoes];
    }
    const filterValueLower = this.filterValue.toLowerCase();
    let filteredData = this.solicitacoes.filter((solicitacao) => {
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
    });

    this.filteredSolicitacoes = [...filteredData];
  };

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

  finalizarSolicitacao(idSolicitacao: string) {
    this.router.navigate([`funcionario/finalizar/${idSolicitacao}`]);
  }

  efetuarManutencao(idSolicitacao: string) {
    this.router.navigate([`funcionario/manutencao/${idSolicitacao}`]);
  }

  goToGerenciarSolicitacoes() {
    this.router.navigate(['funcionario/gerenciar-solicitacoes']);
  }

  getStatusClass(status: string | undefined): string {
    if (!status)
      return 'red';

    switch (status) {
      case 'ORCADA':
        return 'bg-[#8B4513]';
      case 'REJEITADA':
        return 'bg-[#DC3545]';
      case 'APROVADA':
        return 'bg-[#FFD700]';
      case 'REDIRECIONADA':
        return 'bg-[#800080]';
      case 'ARRUMADA':
        return 'bg-[#007BFF]';
      case 'PAGA':
        return 'bg-[#FF5E2B]';
      case 'FINALIZADA':
        return 'bg-[#28A745]';
      case 'ABERTA':
        return 'bg-[#6C757D]';
      default:
        return 'bg-[#423B3A]';
    }
  }
}
