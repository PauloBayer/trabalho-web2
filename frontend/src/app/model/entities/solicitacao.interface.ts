import { EstadoSolicitacaoType } from './estado-solicitacao.type';
import { IHistorico } from '../entities/historico.interface';
import { IFuncionario } from './funcionario.interface';
import { ICliente } from './cliente.interface';
import { ICategoriaEquipamento } from './categoria-equipamento.interface';

export interface ISolicitacao {
    id: string,
    categoriaEquipamento: ICategoriaEquipamento,
    cliente?: ICliente,
    funcionario?: IFuncionario,
    status?: EstadoSolicitacaoType,
    dataHoraCriacao: string,
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
