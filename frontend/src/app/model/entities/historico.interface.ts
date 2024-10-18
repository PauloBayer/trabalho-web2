import { EstadoSolicitacaoType } from './estado-solicitacao.type';
import { IFuncionario } from './funcionario.interface';

export interface IHistorico {
  id: string,
  statusAnterior?: EstadoSolicitacaoType,
  statusAtual: EstadoSolicitacaoType,
  dataHora: string,
  funcionario?: string | IFuncionario,
  descricaoEquipamento?: string,
  descricaoDefeito?: string,
  valorOrcado?: number,
  motivoRejeicao?: string,
  funcionarioOrigem?: string | IFuncionario,
  funcionarioDestino?: string | IFuncionario,
  descricaoManutencao?: string,
  orientacoesManutencao?: string,
}
