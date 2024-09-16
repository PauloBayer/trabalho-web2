import { EstadoSolicitacaoType } from "../types/estado-solicitacao.type";

export interface ISolicitacao {
    data: string,
    descricao: string,
    estado: EstadoSolicitacaoType
}