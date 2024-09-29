import { EstadoSolicitacaoType } from '../types/estado-solicitacao.type';
import { IHistorico } from '@app/../../frontend/src/app/model/interfaces/historico.interface';

export interface ISolicitacao {
    id: string,
    data: string,
    descricaoEquipameto: string,
    descricaoDefeito: string,
    categoriaEquipamento: string,
    estado: EstadoSolicitacaoType,
    historico: IHistorico[]
}
