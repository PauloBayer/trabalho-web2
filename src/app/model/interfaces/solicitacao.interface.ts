import { EstadoSolicitacaoType } from "../types/estado-solicitacao.type";

export interface ISolicitacao {
    id: string,
    data: string,
    descricaoEquipameto: string,
    descricaoDefeito: string,
    categoriaEquipamento: string,
    estado: EstadoSolicitacaoType
}