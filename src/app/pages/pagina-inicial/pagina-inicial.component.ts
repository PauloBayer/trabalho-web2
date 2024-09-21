import { Component, OnInit } from '@angular/core';
import { ISolicitacao } from '../../model/interfaces/solicitacao.interface';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent implements OnInit {
  solicitacoes: ISolicitacao[] = [];

  constructor(private router: Router, private solicitacaoService: SolicitacaoService) {}
  
  ngOnInit(): void {
    this.solicitacaoService.findAllSolicitacoes().subscribe({
      next: (data: ISolicitacao []) => {
        this.solicitacoes = data;
      },
      error: (error) => console.error(error)
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
    this.router.navigate(['solicitacao-manutencao']);
  }

  checkOrcamento() {
    this.router.navigate(['orcamentos']);
  }
}
