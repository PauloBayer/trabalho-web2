import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHistorico } from '../../model/entities/historico.interface';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-funcinario-main-page',
  standalone: true,
  imports: [],
  templateUrl: './funcinario-main-page.component.html',
  styleUrl: './funcinario-main-page.component.css',
})
export class FuncinarioMainPageComponent implements OnInit {
  solicitacoes: ISolicitacao[] = [];
  nome: string | null = '';

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.solicitacaoService.findAllSolicitacoesAsWorker().subscribe({
      next: (data: ISolicitacao[]) => {
        this.solicitacoes = data;
      },
      error: (error) => console.error(error),
    });
    this.nome = this.authService.getNome();
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

  show(s: ISolicitacao) {
    console.log(s);
  }

  efetuarOrcamento(solicitacao: ISolicitacao) {
    this.router.navigate(['worker/efetuar']);
    console.log(solicitacao);
  }

  get orderSolicitacoes(): ISolicitacao[] {
    return this.solicitacoes.filter(
      (solicitacao) => solicitacao.status === 'ABERTA'
    );
  }

  goToFuncionarios() {
    this.router.navigate(['worker/funcionarios']);
  }
  goToCategorias() {
    this.router.navigate(['worker/categorias']);
  }
}
