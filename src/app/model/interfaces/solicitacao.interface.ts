import { EstadoSolicitacaoType } from '../types/estado-solicitacao.type';
import { IHistorico } from './historico.interface';

export interface ISolicitacao {
  data: string;
  descricao: string;
  estado: EstadoSolicitacaoType;
  historico: IHistorico[];
}
