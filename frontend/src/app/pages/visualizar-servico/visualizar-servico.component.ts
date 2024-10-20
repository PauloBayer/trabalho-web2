import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';

@Component({
  selector: 'app-servico-visualizar',
  standalone: true,
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.css'],
  imports: [CommonModule],
})
export class VisualizarServicoComponent implements OnInit {
  solicitacao: ISolicitacao | null = null;
  solicitacaoId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private solicitacaoService: SolicitacaoService 
  ) {}

  ngOnInit(): void {
    this.solicitacaoId = this.route.snapshot.paramMap.get('id') || '';

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (solicitacao) => {
          this.solicitacao = solicitacao;
        },
        error: (err) => {
          console.error('Erro ao carregar solicitação:', err);
        }
      });
    }
  }

  visualizarServico() {
    alert('Visualizando detalhes do serviço!');
  }

  voltar() {
    this.router.navigate(['client']);
  }
}
