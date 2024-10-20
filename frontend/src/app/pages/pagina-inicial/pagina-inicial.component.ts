import { Component, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoSolicitacaoType } from '../../model/entities/estado-solicitacao.type';
import { IHistorico } from '../../model/entities/historico.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent implements OnInit {
  solicitacoes: ISolicitacao[] = [];

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.solicitacaoService.findAllSolicitacoes().subscribe({
      next: (data: ISolicitacao[]) => {
        this.solicitacoes = data;
      },
      error: (error) => console.error(error),
    });
  }

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

  resgatarSolicitacao(s: ISolicitacao) {
    const historico: IHistorico = {
      dataHora: new Date().toISOString(),
      statusAtual: EstadoSolicitacaoType.APROVADA,
      id: '',
    };
    s.historico?.push(historico);
  }

  show(s: ISolicitacao) {
    console.log(s);
  }

  checkOrcamento() {
    this.router.navigate(['client/orcamentos']);
  }

  get orderSolicitacoes(): ISolicitacao[] {
    return this.solicitacoes;
    // return this.solicitacoes.sort(
    //   (a, b) => new Date(a.dataHoraCriacao).getTime() - new Date(b.data).getTime()
    // );
  }
}
