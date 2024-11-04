import { Component, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoSolicitacaoType } from '../../model/entities/estado-solicitacao.enum';
import { Historico } from '../../model/entities/historico';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../model/entities/solicitacao';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent implements OnInit {
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

  onFazerSolicitacao() {
    this.router.navigate(['client/solicitacao-manutencao']);
  }

  resgatarSolicitacao(s: Solicitacao) {
    const historico: Historico = {
      dataHora: new Date().toISOString(),
      statusAtual: EstadoSolicitacaoType.APROVADA,
      id: '',
    };
    s.historico?.push(historico);

    this.solicitacaoService.resgatarServico(s.id).subscribe({
      next: () => {
        alert('Solicitação resgatada com sucesso');
        this.solicitacaoService.findAllSolicitacoes().subscribe({
          next: (data: Solicitacao[]) => {
            this.solicitacoes = data;
          },
          error: (error) => console.error(error),
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get orderSolicitacoes(): Solicitacao[] {
    return this.solicitacoes;
    // return this.solicitacoes.sort(
    //   (a, b) => new Date(a.dataHoraCriacao).getTime() - new Date(b.data).getTime()
    // );
  }

  pagarServico(idSolicitacao: string) {
    this.router.navigate([`client/pagar-servico/${idSolicitacao}`])
  }

  visualizarServico(idSolicitacao: string) {
    this.router.navigate([`client/servico/${idSolicitacao}`])
  }

  checkOrcamento(idSolicitacao: string) {
    this.router.navigate([`client/orcamentos/${idSolicitacao}`])
  }
}
