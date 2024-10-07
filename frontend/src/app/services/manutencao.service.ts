import { Injectable } from '@angular/core';
import { ISolicitacao } from '../model/interfaces/solicitacao.interface'; 
import { IHistorico } from '../model/interfaces/historico.interface'; 
import { EstadoSolicitacaoType } from '../model/types/estado-solicitacao.type'; 

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
  // Dados simulados, tem que alterar dai!
  solicitacoes: ISolicitacao[] = [
    {
      id: '1',
      data: '2024-10-06',
      cliente: 'Naruto Uzumaki',
      descricaoEquipamento: 'Descrição Equipamento',
      descricaoDefeito: 'Descrição Defeito',
      categoriaEquipamento: 'Notebook',
      estado: 'ABERTA' as EstadoSolicitacaoType,
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
      solicitacao.estado = 'ARRUMADA' as EstadoSolicitacaoType;
      solicitacao.historico?.push({
        acao: 'Manutenção Efetuada',
        descricaoManutencao,
        orientacoesCliente,
        funcionario,
        data: new Date().toISOString(), 
        estado: solicitacao.estado 
      } as IHistorico);
    }
  }

  redirecionarManutencao(id: string, funcionarioOrigem: string, funcionarioDestino: string) {
    const solicitacao = this.getSolicitacaoById(id);
    if (solicitacao && solicitacao.estado !== undefined && solicitacao.estado !== 'REDIRECIONADA') {
      solicitacao.estado = 'REDIRECIONADA' as EstadoSolicitacaoType;
      solicitacao.historico?.push({
        acao: 'Redirecionada',
        funcionarioOrigem,
        funcionarioDestino,
        data: new Date().toISOString(), 
        estado: solicitacao.estado 
      } as IHistorico);
    }
  }

  finalizarSolicitacao(id: string, funcionario: string) {
    const solicitacao = this.getSolicitacaoById(id);
    if (solicitacao) {
      solicitacao.estado = 'FINALIZADA' as EstadoSolicitacaoType;
      solicitacao.historico?.push({
        acao: 'Finalizada',
        funcionario,
        data: new Date().toISOString(), 
        estado: solicitacao.estado 
      } as IHistorico);
    }
  }
}
