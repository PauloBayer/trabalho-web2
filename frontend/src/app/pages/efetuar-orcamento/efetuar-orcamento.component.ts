import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitacao } from '../../model/entities/solicitacao';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css']
})
export class EfetuarOrcamentoComponent implements OnInit {
  solicitacaoId: string | null = null;
  solicitacao!: Solicitacao;

  orcamentoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private router: Router
  ) {
    this.orcamentoForm = new FormGroup({
      number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      orientacoesExtras: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.solicitacaoId = params.get('id');
    });

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (data: Solicitacao) => {
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
    if (this.orcamentoForm.valid && this.solicitacaoId) {
      const valorOrcado = this.orcamentoForm.get('number')?.value;
      const orientacoesExtras = this.orcamentoForm.get('orientacoesExtras')?.value;

      this.solicitacaoService.efetuarOrcamento(this.solicitacaoId, valorOrcado, orientacoesExtras).subscribe({
        next: () => {
          alert('Sucesso ao efetuar o orçamento');
          this.router.navigate(['funcionario']);
        },
        error: (error) => {
          alert(`Erro ao efetuar o orçamento: ${error}`);
          this.router.navigate(['funcionario']);
        }
      });
    } else {
      this.orcamentoForm.markAllAsTouched();
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
