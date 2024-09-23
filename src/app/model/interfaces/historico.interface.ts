import { EstadoSolicitacaoType } from '../types/estado-solicitacao.type';

export interface IHistorico {
  data: string;
  estado: EstadoSolicitacaoType;
}
