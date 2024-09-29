import { EstadoSolicitacaoType } from '../types/estado-solicitacao.type';
import { IHistorico } from './historico.interface';

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