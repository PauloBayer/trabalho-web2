import { IHistorico } from "../interfaces/historico.interface";
import { ISolicitacao } from "../interfaces/solicitacao.interface";
import { EstadoSolicitacaoType } from "../types/estado-solicitacao.type";

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