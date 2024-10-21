import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.css'
})
export class EfetuarOrcamentoComponent implements OnInit {
  solicitacaoId: string | null = null;
  solicitacao!: ISolicitacao;

  orcamentoForm: FormGroup;

  constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService, private router: Router) {
    this.orcamentoForm = new FormGroup({
      number: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.solicitacaoId = params.get('id');
    });

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (data: ISolicitacao) => {
          this.solicitacao = data;

          if (this.solicitacao.status !== 'ABERTA') {
            alert('Não é possível pagar o serviço porque o status não é ABERTA');
            this.router.navigate(['funcionario']);
          }
        },
        error: (error) => {
          this.router.navigate(['not-found']);
        }
      });
    }
  }

  onEfetuarOrcamento() {
    if (this.solicitacaoId) {
      const valorOrcado = this.orcamentoForm.get('number')?.value;

      this.solicitacaoService.efetuarOrcamento(this.solicitacaoId, valorOrcado).subscribe({
        next: () => {
          alert('Sucesso ao efetuar o orçamento');
          this.router.navigate(['funcionario']);
        },
        error: (error) => {
          alert(`Erro ao efetuar o orçamento: ${error}`);
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
