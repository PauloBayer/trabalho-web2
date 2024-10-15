import { IHistorico } from "../entities/historico.interface";
import { EstadoSolicitacaoType } from "../entities/estado-solicitacao.type";
import { ISolicitacao } from "../entities/solicitacao.interface";

export class Solicitacao implements ISolicitacao {
    funcionario?: string | undefined;
    status?: EstadoSolicitacaoType | undefined;
    dataHoraCriacao: string;
    dataHoraAtualizacao?: string;
    valorOrcado?: number | undefined;
    motivoRejeicao?: string | undefined;
    dataHoraPagamento?: string | undefined;
    orientacoesManutencao?: string | undefined;
    descricaoManutencao?: string | undefined;
    id: string = '';
    data: string = '';
    cliente: string = '';
    descricaoEquipamento?: string;
    descricaoDefeito?: string;
    categoriaEquipamento?: string;
    estado: EstadoSolicitacaoType = 'ABERTA';
    historico?: IHistorico[];

    constructor(dataHoraCriacao: string) {
        this.dataHoraCriacao = dataHoraCriacao;
    }
}