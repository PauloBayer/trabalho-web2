import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';

@Component({
  selector: 'app-pagar-servico',
  standalone: true,
  imports: [],
  templateUrl: './pagar-servico.component.html',
  styleUrl: './pagar-servico.component.css'
})
export class PagarServicoComponent implements OnInit {
  solicitacaoId: string | null = null;
  solicitacao!: ISolicitacao;

  constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.solicitacaoId = params.get('id');
    });

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (data: ISolicitacao) => {
          this.solicitacao = data;

          if (this.solicitacao.status !== 'AGUARDANDO_PAGAMENTO') {
            alert('Não é possível pagar o serviço porque o status não é AGUARDANDO_PAGAMENTO');
            this.router.navigate(['client']);
          }
        },
        error: (error) => {
          this.router.navigate(['not-found']);
        }
      });
    }
  }

  onPagarServico() {
    if (this.solicitacaoId) {
      this.solicitacaoService.pagarServico(this.solicitacaoId).subscribe({
        next: () => {
          alert('Sucesso ao realizar pagamento');
          this.router.navigate(['client']);
        },
        error: (error) => {
          alert(`Erro ao realizar pagamento: ${error}`);
          this.router.navigate(['client']);
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
