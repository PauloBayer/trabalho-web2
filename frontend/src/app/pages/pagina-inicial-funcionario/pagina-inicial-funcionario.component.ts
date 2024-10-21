import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Router } from '@angular/router';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';

@Component({
  selector: 'app-pagina-inicial-funcionario',
  standalone: true,
  imports: [],
  templateUrl: './pagina-inicial-funcionario.component.html',
  styleUrl: './pagina-inicial-funcionario.component.css'
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  
  solicitacoes: ISolicitacao [] = [];

  constructor (private router: Router, private solicitacaoService: SolicitacaoService) {}
  
  ngOnInit(): void {
    this.solicitacaoService.findAllSolicitacoesWithStatusABERTA().subscribe({
      next: (data: ISolicitacao []) => {
        this.solicitacoes = data;
      },
      error: (error) => {
        alert(`ERRO: ${error}`);
      }
    })
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
