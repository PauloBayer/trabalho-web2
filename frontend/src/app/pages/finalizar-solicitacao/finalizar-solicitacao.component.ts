import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitacao } from '../../model/entities/solicitacao';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrl: './finalizar-solicitacao.component.css'
})
export class FinalizarSolicitacaoComponent  implements OnInit {
  solicitacaoId: string | null = null;
  solicitacao!: Solicitacao;

  constructor(
    private route: ActivatedRoute, 
    private solicitacaoService: SolicitacaoService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.solicitacaoId = params.get('id');
    });

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (data: Solicitacao) => {
          this.solicitacao = data;

          if (this.solicitacao.status !== 'PAGA') {
            alert('Não é possível pagar o serviço porque o status não é PAGA');
            this.router.navigate(['funcionario']);
          }
        },
        error: (error) => {
          this.router.navigate(['not-found']);
        }
      });
    }
  }

  onFinalizarSolicitacao() {
    if (this.solicitacaoId) {
      this.solicitacaoService.finalizarSolicitacao(this.solicitacaoId).subscribe({
        next: () => {
          alert('Sucesso ao finalizar solicitação');
          this.router.navigate(['funcionario']);
        },
        error: (error) => {
          alert(error);
          this.router.navigate(['funcionario']);
        }
      });
    }
  }

  formatDate(ISOFormatTimestamp: string): string {
    const date = new Date(ISOFormatTimestamp);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}h${minutes}`;
  }
}
