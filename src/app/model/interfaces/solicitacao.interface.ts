import { EstadoSolicitacaoType } from '../types/estado-solicitacao.type';
import { IHistorico } from '@app/../../frontend/src/app/model/interfaces/historico.interface';

export interface ISolicitacao {
    id: string,
    data: string,
    cliente: string,
    descricaoEquipamento?: string,
    descricaoDefeito?: string,
    categoriaEquipamento?: string,
    estado: EstadoSolicitacaoType,
    historico?: IHistorico[]
}

export class Solicitacao implements ISolicitacao {
    id: string = '';
    data: string = '';
    cliente: string = '';
    descricaoEquipamento?: string;
    descricaoDefeito?: string;
    categoriaEquipamento?: string;
    estado: EstadoSolicitacaoType = 'ABERTA';
    historico?: IHistorico[];
}