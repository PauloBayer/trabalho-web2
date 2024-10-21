import { Injectable } from '@angular/core';
import { ICategoriaEquipamento } from '../model/entities/categoria-equipamento.interface';
import { Observable, of, throwError } from 'rxjs';
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

  findAllSolicitacoesWithStatusABERTA(): Observable<ISolicitacao []> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let allSolicitacoes = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacoesAbertas: ISolicitacao[] = allSolicitacoes.filter((solicitacao: { status: string; }) => solicitacao.status === 'ABERTA');
    
    return of(solicitacoesAbertas);
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

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: IFuncionario | ICliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as IFuncionario).dataNascimento)
      return throwError(() => new Error(`Não autorizado: funcionários não podem criar solicitações`));

    solicitacoes.push({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      categoriaEquipamento: categoriaEquipamento,
      descricaoDefeito: descricaoDefeito,
      descricaoEquipamento: descricaoEquipamento,
      dataHoraCriacao: dataHora,
      cliente: userLogado as ICliente,
      status: 'ABERTA',
      historico: [{
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        dataHora: dataHora,
        statusAtual: 'ABERTA',
        descricaoDefeito: descricaoDefeito,
        descricaoEquipamento: descricaoEquipamento,
      }]
    });

    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    return of(null);
  }

  efetuarOrcamento(id: string, valorOrcado: number): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: IFuncionario | ICliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as ICliente).cep)
      return throwError(() => new Error(`Não autorizado: clientes não podem finalizar solicitações`));
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: 'ORCADA',
          valorOrcado: valorOrcado,
          funcionario: userLogado as IFuncionario
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'ORCADA',
          historico: historicoAtualizado,
          valorOrcado: valorOrcado,
          funcionario: userLogado as IFuncionario
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
          statusAtual: 'APROVADA',
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'APROVADA',
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
          statusAtual: 'REJEITADA',
          motivoRejeicao: motivoRejeicao
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'APROVADA',
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

  redirecionarManutencao(id: string, funcionarioDestino: IFuncionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: IFuncionario | ICliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as ICliente).cep)
      return throwError(() => new Error(`Não autorizado: clientes não podem finalizar solicitações`));
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: 'AGUARDANDO_PAGAMENTO',
          funcionarioOrigem: userLogado as IFuncionario,
          funcionarioDestino: funcionarioDestino,
          funcionario: userLogado as IFuncionario
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'AGUARDANDO_PAGAMENTO',
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
          statusAtual: 'AGUARDANDO_PAGAMENTO',
          orientacoesManutencao: orientacoesManutencao,
          descricaoManutencao: descricaoManutencao,
          funcionario: funcionario
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'AGUARDANDO_PAGAMENTO',
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
          statusAtual: 'PAGA'
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'PAGA',
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

  finalizarSolicitacao(id: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: IFuncionario | ICliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as ICliente).cep)
      return throwError(() => new Error(`Não autorizado: clientes não podem finalizar solicitações`));
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;
  
        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];
  
        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: 'FINALIZADA',
          funcionario: userLogado as IFuncionario
        });
  
        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'FINALIZADA',
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

  resgatarServico(id: string): Observable<null> {
    const solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        if (solicitacao.status !== 'REJEITADA') {
          throw new Error(`Solicitação com ID ${id} não está no status 'REJEITADA'.`);
        }

        solicitacaoEncontrada = true;

        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];

        historicoAtualizado.push({
          id: this.generateUniqueId(),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: 'APROVADA'
        });

        const updatedSolicitacao: ISolicitacao = { 
          ...solicitacao, 
          status: 'APROVADA',
          historico: historicoAtualizado
        };

        return updatedSolicitacao;
      }
      return solicitacao;
    });

    if (!solicitacaoEncontrada) {
      return throwError(() => new Error(`Solicitação com ID ${id} não encontrada.`));
    }

    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    return of(null);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}
