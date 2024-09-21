import { Component, computed } from '@angular/core';
import { ISolicitacao } from '../../model/interfaces/solicitacao.interface';
import { Router } from '@angular/router';
import { EstadoSolicitacaoType } from '../../model/types/estado-solicitacao.type';
import { IHistorico } from '../../model/interfaces/historico.interface';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {
  solicitacoes: ISolicitacao[] = [
    {
      data: '2024-09-13T14:30:00Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'ORÇADA',
      historico: [
        {
          data: '2024-09-12T14:30:00Z',
          estado: 'CRIADA',
        },
        {
          data: '2024-09-13T14:30:00Z',
          estado: 'ORÇADA',
        },
      ],
    },
    {
      data: '2023-07-21T09:15:45Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'ARRUMADA',
      historico: [
        {
          data: '2023-07-20T09:15:45Z',
          estado: 'CRIADA',
        },
        {
          data: '2023-07-21T09:15:45Z',
          estado: 'ARRUMADA',
        },
      ],
    },
    {
      data: '2023-12-31T23:59:59Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'REJEITADA',
      historico: [
        {
          data: '2023-12-30T23:59:59Z',
          estado: 'CRIADA',
        },
        {
          data: '2023-12-31T23:59:59Z',
          estado: 'REJEITADA',
        },
      ],
    },
    {
      data: '2022-01-01T00:00:00Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'APROVADA',
      historico: [
        {
          data: '2021-12-31T00:00:00Z',
          estado: 'CRIADA',
        },
        {
          data: '2022-01-01T00:00:00Z',
          estado: 'APROVADA',
        },
      ],
    },
    {
      data: '2024-09-13T14:30:00Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'ORÇADA',
      historico: [
        {
          data: '2024-09-12T14:30:00Z',
          estado: 'CRIADA',
        },
        {
          data: '2024-09-13T14:30:00Z',
          estado: 'ORÇADA',
        },
      ],
    },
    {
      data: '2024-09-13T14:30:00Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'ORÇADA',
      historico: [
        {
          data: '2024-09-12T14:30:00Z',
          estado: 'CRIADA',
        },
        {
          data: '2024-09-13T14:30:00Z',
          estado: 'ORÇADA',
        },
      ],
    },
    {
      data: '2023-12-31T23:59:59Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'REJEITADA',
      historico: [
        {
          data: '2023-12-30T23:59:59Z',
          estado: 'CRIADA',
        },
        {
          data: '2023-12-31T23:59:59Z',
          estado: 'REJEITADA',
        },
      ],
    },
    {
      data: '2022-01-01T00:00:00Z',
      descricao: 'lorem ipsum ergo sutum lorem ipsum',
      estado: 'APROVADA',
      historico: [
        {
          data: '2021-12-31T00:00:00Z',
          estado: 'CRIADA',
        },
        {
          data: '2022-01-01T00:00:00Z',
          estado: 'APROVADA',
        },
      ],
    },
  ];

  get orderSolicitacoes(): ISolicitacao[] {
    return this.solicitacoes.sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );
  }

  constructor(private router: Router) {}

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
    this.router.navigate(['solicitacao-manutencao']);
  }

  resgatarSolicitacao(s: ISolicitacao) {
    s.data = new Date().toISOString();
    s.estado = 'APROVADA';
    const historico: IHistorico = {
      data: s.data,
      estado: s.estado,
    };
    s.historico?.push(historico);
  }

  show(s: ISolicitacao) {
    console.log(s);
  }
}
