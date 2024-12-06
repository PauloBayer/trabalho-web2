import { EstadoSolicitacaoType } from './estado-solicitacao.enum';
import { Historico } from './historico';
import { Funcionario } from './funcionario';
import { Cliente } from './cliente';
import { CategoriaEquipamento } from './categoria-equipamento';

export class Solicitacao {
    id: string = '';
    categoriaEquipamento?: string = undefined;
    cliente?: Cliente = undefined;
    funcionario?: Funcionario = undefined;
    status?: EstadoSolicitacaoType = undefined;
    orientacoesExtrasOrcamento: string | null = null;
    dataHoraCriacao: string = '';
    descricaoOrcamento: string = '';
    dataHoraAtualizacao?: string = undefined;
    descricaoEquipamento?: string = undefined;
    descricaoDefeito?: string = undefined;
    valorOrcado?: number = undefined;
    motivoRejeicao?: string = undefined;
    dataHoraPagamento?: string = undefined;
    orientacoesManutencao?: string = undefined;
    descricaoManutencao?: string = undefined;
    historico?: Historico[] = undefined;
}
