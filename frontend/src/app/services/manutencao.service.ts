import { Injectable } from '@angular/core';
import { IHistorico } from '../model/entities/historico.interface'; 
import { EstadoSolicitacaoType } from '../model/entities/estado-solicitacao.type'; 
import { ISolicitacao } from '../model/entities/solicitacao.interface';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  // Dados simulados, tem que alterar dai!
  solicitacoes: ISolicitacao[] = [
    {
      id: '1',
      dataHoraCriacao: '2024-10-06',
      cliente: 'Naruto Uzumaki',
      descricaoEquipamento: 'Descrição Equipamento',
      descricaoDefeito: 'Descrição Defeito',
      categoriaEquipamento: 'Notebook',
      status: 'ABERTA' as EstadoSolicitacaoType,
      historico: []
    }
  ];

  getSolicitacaoById(id: string): ISolicitacao | undefined {
    return this.solicitacoes.find(solicitacao => solicitacao.id === id);
  }

  efetuarManutencao(id: string, descricaoManutencao: string, orientacoesCliente: string, funcionario: string) {
    if (!id || !descricaoManutencao || !orientacoesCliente || !funcionario) {
      throw new Error("Todos os parâmetros são obrigatórios.");
    }
    
    const solicitacao = this.getSolicitacaoById(id);
    if (solicitacao) {
      solicitacao.status = 'ARRUMADA' as EstadoSolicitacaoType;
      // solicitacao.historico?.push({
      //   acao: 'Manutenção Efetuada',
      //   descricaoManutencao,
      //   orientacoesCliente,
      //   funcionario,
      //   data: new Date().toISOString(), 
      //   estado: solicitacao.estado 
      // } as IHistorico);
    }
  }

  redirecionarManutencao(id: string, funcionarioOrigem: string, funcionarioDestino: string) {
    const solicitacao = this.getSolicitacaoById(id);
    if (solicitacao && solicitacao.status !== undefined && solicitacao.status !== 'REDIRECIONADA') {
      solicitacao.status = 'REDIRECIONADA' as EstadoSolicitacaoType;
      // solicitacao.historico?.push({
      //   acao: 'Redirecionada',
      //   funcionarioOrigem,
      //   funcionarioDestino,
      //   data: new Date().toISOString(), 
      //   estado: solicitacao.estado 
      // } as IHistorico);
    }
  }

  finalizarSolicitacao(id: string, funcionario: string) {
    const solicitacao = this.getSolicitacaoById(id);
    if (solicitacao) {
      solicitacao.status = 'FINALIZADA' as EstadoSolicitacaoType;
      // solicitacao.historico?.push({
      //   acao: 'Finalizada',
      //   funcionario,
      //   data: new Date().toISOString(), 
      //   estado: solicitacao.estado 
      // } as IHistorico);
    }
  }
}
