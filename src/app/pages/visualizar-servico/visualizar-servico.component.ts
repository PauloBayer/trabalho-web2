import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-visualizar',
  standalone: true,
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.css'],
  imports: [CommonModule] 
})
export class VisualizarServicoComponent implements OnInit {
  solicitacao: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.solicitacao = {
      id: '12345',
      servico: 'Formatação de Equipamento',
      data: new Date('2024-09-20T13:58:00'),
      status: 'ORÇADA', 
      descricao: 'Solicitação de formatação e reinstalação do sistema operacional.',
      passos: [
        { data: new Date('2024-09-20T13:35:00'), funcionario: 'João Silva', acao: 'Solicitação Realizada' },
        { data: new Date('2024-09-20T13:45:00'), funcionario: 'João Silva', acao: 'Orçamento Aprovado' },
        { data: new Date('2024-09-20T13:58:00'), funcionario: 'João Silva', acao: 'Aguardando Pagamento' },
      ]
    };
  }

  aprovarSolicitacao() {
    this.router.navigate(['/orcamentos']); 
  }

  rejeitarSolicitacao() {
    alert('Solicitação rejeitada!');
  }

  resgatarServico() {
    alert('Serviço resgatado!');
  }

  pagarServico() {
    alert('Pagamento realizado!');
  }

  visualizarServico() {
    alert('Visualizando detalhes do serviço!');
  }

  voltar() {
    this.router.navigate(['']); 
  }
}
