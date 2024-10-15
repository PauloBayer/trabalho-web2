import { EstadoSolicitacaoType } from './estado-solicitacao.type';

export interface IHistorico {
  id: string,
  statusAnterior?: EstadoSolicitacaoType,
  statusAtual: EstadoSolicitacaoType,
  dataHora: string,
  funcionario?: string,
  descricaoEquipamento?: string,
  descricaoDefeito?: string,
  valorOrcado?: number,
  motivoRejeicao?: string,
  nomeFuncionarioOrigem?: string,
  nomeFuncionarioDestino?: string,
  descricaoManutencao?: string,
  orientacoesManutencao?: string,
}
