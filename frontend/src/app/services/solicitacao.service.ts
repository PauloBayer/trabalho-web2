import { Injectable } from '@angular/core';
import { ICategoriaEquipamento } from '../model/entities/categoria-equipamento.interface';
import { Observable, of, throwError } from 'rxjs';
import { EstadoSolicitacaoType } from '../model/entities/estado-solicitacao.type';
import { ISolicitacao } from '../model/entities/solicitacao.interface';
import { ICliente } from '../model/entities/cliente.interface';
import { IFuncionario } from '../model/entities/funcionario.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor() {}

  findAllSolicitacoes(): Observable<ISolicitacao []> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let allSolicitacoes = solicitacoesString ? JSON.parse(solicitacoesString) : [];

    let usuarioLogadoString = localStorage.getItem('userLogado');
    let usuarioLogado: ICliente | IFuncionario | null = usuarioLogadoString ? JSON.parse(usuarioLogadoString) : null;

    if (usuarioLogado && (usuarioLogado as ICliente).cpf) {
      let solicitacoesDoClienteLogado: ISolicitacao[] = allSolicitacoes.filter((solicitacao: { cliente: { cpf: string; }; }) => 
        solicitacao?.cliente?.cpf === (usuarioLogado as ICliente).cpf
    );
    return of(solicitacoesDoClienteLogado);
    } else {
      return of(allSolicitacoes);
    }
  }

  getSolicitacaoById(id: string): Observable<ISolicitacao> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let allSolicitacoes: ISolicitacao [] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    const foundedSolicitacao = allSolicitacoes.find((solicitacao: ISolicitacao) => solicitacao.id === id);

    return foundedSolicitacao ? of(foundedSolicitacao) : throwError(() => new Error(`solicitacao com o id ${id} nao encontrada`));
  }

  criarSolicitacao(descricaoEquipamento: string, descricaoDefeito: string, categoriaEquipamento: ICategoriaEquipamento): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    const dataHora = new Date().toISOString();
    
    solicitacoes.push({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      categoriaEquipamento: categoriaEquipamento,
      descricaoDefeito: descricaoDefeito,
      descricaoEquipamento: descricaoEquipamento,
      dataHoraCriacao: dataHora,
      status: EstadoSolicitacaoType.ABERTA,
      historico: [{
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        dataHora: dataHora,
        statusAtual: EstadoSolicitacaoType.ABERTA,
        descricaoDefeito: descricaoDefeito,
        descricaoEquipamento: descricaoEquipamento,
      }]
    });

    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    return of(null);
  }

  efetuarOrcamento(id: string, valorOrcado: number, funcionario: IFuncionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.ORCADA,
          valorOrcado: valorOrcado,
          funcionario: funcionario
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.ORCADA,
          historico: historicoAtualizado,
          valorOrcado: valorOrcado,
          funcionario: funcionario
        };
  
        return updatedSolicitacao;
      }

      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  aprovarServico(id: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.APROVADA,
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.APROVADA,
          historico: historicoAtualizado
        };
  
        return updatedSolicitacao;
      }
      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  rejeitarServico(id: string, motivoRejeicao: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.REJEITADA,
          motivoRejeicao: motivoRejeicao
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.APROVADA,
          motivoRejeicao: motivoRejeicao,
          historico: historicoAtualizado
        };
  
        return updatedSolicitacao;
      }
      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  redirecionarManutencao(id: string, funcionarioOrigem: IFuncionario, funcionarioDestino: IFuncionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.REDIRECIONADA,
          funcionarioOrigem: funcionarioOrigem,
          funcionarioDestino: funcionarioDestino,
          funcionario: funcionarioOrigem
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.REDIRECIONADA,
          funcionario: funcionarioDestino,
          historico: historicoAtualizado
        };
  
        return updatedSolicitacao;
      }
      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  efetuarManutencao(id: string, descricaoManutencao: string, orientacoesManutencao: string, funcionario: IFuncionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO,
          orientacoesManutencao: orientacoesManutencao,
          descricaoManutencao: descricaoManutencao,
          funcionario: funcionario
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO,
          historico: historicoAtualizado,
          orientacoesManutencao: orientacoesManutencao,
          descricaoManutencao: descricaoManutencao
        };
  
        return updatedSolicitacao;
      }

      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  pagarServico(id: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.PAGA
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.PAGA as EstadoSolicitacaoType,
          historico: historicoAtualizado
        };
  
        return updatedSolicitacao;
      }
      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  finalizarSolicitacao(id: string, funcionarioResponsavel: IFuncionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.FINALIZADA,
          funcionario: funcionarioResponsavel
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: EstadoSolicitacaoType.FINALIZADA,
          historico: historicoAtualizado,
        };
  
        return updatedSolicitacao;
      }

      return solicitacao;
    });
  
    if (!solicitacaoEncontrada)
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada`))
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }
}
