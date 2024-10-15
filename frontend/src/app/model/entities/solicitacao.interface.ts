import { EstadoSolicitacaoType } from './estado-solicitacao.type';
import { IHistorico } from '../entities/historico.interface';

export interface ISolicitacao {
    id?: string,
    categoriaEquipamento?: string,
    cliente?: string,
    funcionario?: string,
    status?: EstadoSolicitacaoType,
    dataHoraCriacao?: string,
    dataHoraAtualizacao?: string,
    descricaoEquipamento?: string,
    descricaoDefeito?: string,
    valorOrcado?: number,
    motivoRejeicao?: string,
    dataHoraPagamento?: string,
    orientacoesManutencao?: string,
    descricaoManutencao?: string,
    historico?: IHistorico[]
}
