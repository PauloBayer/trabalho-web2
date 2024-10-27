import { EstadoSolicitacaoType } from './estado-solicitacao.enum';
import { Funcionario } from './funcionario';

export class Historico {
  id: string = '';
  statusAnterior?: EstadoSolicitacaoType = undefined;
  statusAtual?: EstadoSolicitacaoType = undefined;
  dataHora: string = '';
  funcionario?: string | Funcionario = '';
  descricaoEquipamento?: string = undefined;
  descricaoDefeito?: string = undefined;
  valorOrcado?: number = undefined;
  motivoRejeicao?: string = undefined;
  funcionarioOrigem?: string | Funcionario = undefined;
  funcionarioDestino?: string | Funcionario = undefined;
  descricaoManutencao?: string = undefined;
  orientacoesManutencao?: string = undefined;
}
