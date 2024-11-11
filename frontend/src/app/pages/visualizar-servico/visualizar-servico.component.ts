import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../model/entities/solicitacao';
import { AuthService } from '../../services/auth.service';
import { Historico } from '../../model/entities/historico';
import { Funcionario } from '../../model/entities/funcionario';

@Component({
  selector: 'app-servico-visualizar',
  standalone: true,
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.css'],
  imports: [CommonModule],
})
export class VisualizarServicoComponent implements OnInit {
  solicitacao: Solicitacao | null = null;
  solicitacaoId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.solicitacaoId = this.route.snapshot.paramMap.get('id') || '';

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (solicitacao) => {
          this.solicitacao = solicitacao;
          console.log(solicitacao);
          console.log(this.solicitacao?.historico);
          const teste: Historico[] | undefined = this.solicitacao?.historico;
          // console.log('a', teste, teste?.[1]?.funcionario?.nome);
        },
        error: (err) => {
          console.error('Erro ao carregar solicitação:', err);
        },
      });
    }
  }

  getFuncionarioNome(funcionario: Funcionario | string | undefined): string {
    if (typeof funcionario === 'string')
      return 'Funcionário inválido: ' + funcionario;

    if (!funcionario) return 'Funcionário';

    return funcionario.nome || 'Nome do funcionário não disponível';
  }
  visualizarServico() {
    alert('Visualizando detalhes do serviço!');
  }

  voltar() {
    this.authService.navigateToHomepageByRole();
  }
}
