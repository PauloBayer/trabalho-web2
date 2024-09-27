import { EstadoSolicitacaoType } from '../types/estado-solicitacao.type';
import { IHistorico } from './historico.interface';

export interface ISolicitacao {
    id: string,
    data: string,
    descricaoEquipameto: string,
    descricaoDefeito: string,
    categoriaEquipamento: string,
    estado: EstadoSolicitacaoType,
    historico: IHistorico[]
}
