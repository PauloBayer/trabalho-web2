import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Solicitacao } from '../model/entities/solicitacao';
import { Cliente } from '../model/entities/cliente';
import { Funcionario } from '../model/entities/funcionario';
import { EstadoSolicitacaoType } from '../model/entities/estado-solicitacao.enum';
import { CategoriaEquipamento } from '../model/entities/categoria-equipamento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../env/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private apiUrl: string = environment.httpApiUrl

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  findAllSolicitacoesByUser(): Observable<Solicitacao []> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao []>(`${this.apiUrl}/api/v1/solicitacoes/user`, { headers: headers });
  }

  findAllSolicitacoes(): Observable<Solicitacao []> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao []>(`${this.apiUrl}/api/v1/solicitacoes`, { headers: headers });
  }

  getSolicitacaoById(id: string): Observable<Solicitacao> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao>(`${this.apiUrl}/api/v1/solicitacoes/${id}`, { headers: headers });
  }

  criarSolicitacao(descricaoEquipamento: string, descricaoDefeito: string, categoriaEquipamento: CategoriaEquipamento): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    const dataHora = new Date().toISOString();

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: Funcionario | Cliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as Funcionario).dataNascimento)
      return throwError(() => new Error(`Não autorizado: funcionários não podem criar solicitações`));

    solicitacoes.push({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      categoriaEquipamento: categoriaEquipamento,
      descricaoDefeito: descricaoDefeito,
      descricaoEquipamento: descricaoEquipamento,
      descricaoOrcamento: '',
      dataHoraCriacao: dataHora,
      cliente: userLogado as Cliente,
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

  efetuarOrcamento(id: string, valorOrcado: number, orientacoesExtras: string): Observable<null> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    const body = { valorOrcado: valorOrcado, orientacoesExtras: orientacoesExtras };
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/orcamento`, body, { headers: headers });
  }

  aprovarServico(id: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
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

        const updatedSolicitacao: Solicitacao = {
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
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
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

        const updatedSolicitacao: Solicitacao = {
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

  redirecionarManutencao(id: string, funcionarioDestino: Funcionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: Funcionario | Cliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as Cliente).cep)
      return throwError(() => new Error(`Não autorizado: clientes não podem finalizar solicitações`));

    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;

        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];

        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO,
          funcionarioOrigem: userLogado as Funcionario,
          funcionarioDestino: funcionarioDestino,
          funcionario: userLogado as Funcionario
        });

        const updatedSolicitacao: Solicitacao = {
          ...solicitacao,
          status: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO,
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

  efetuarManutencao(id: string, descricaoManutencao: string, orientacoesManutencao: string, funcionario: Funcionario): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
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

        const updatedSolicitacao: Solicitacao = {
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
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
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

        const updatedSolicitacao: Solicitacao = {
          ...solicitacao,
          status: EstadoSolicitacaoType.PAGA,
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
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: Funcionario | Cliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;

    if (!userLogado)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if ((userLogado as Cliente).cep)
      return throwError(() => new Error(`Não autorizado: clientes não podem finalizar solicitações`));

    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        solicitacaoEncontrada = true;

        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];

        historicoAtualizado.push({
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.FINALIZADA,
          funcionario: userLogado as Funcionario
        });

        const updatedSolicitacao: Solicitacao = {
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

  resgatarServico(id: string): Observable<null> {
    const solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: Solicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    let solicitacaoEncontrada = false;

    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id) {
        if (solicitacao.status !== EstadoSolicitacaoType.REJEITADA) {
          throw new Error(`Solicitação com ID ${id} não está no status 'REJEITADA'.`);
        }

        solicitacaoEncontrada = true;

        const historicoAtualizado = solicitacao.historico ? [...solicitacao.historico] : [];

        historicoAtualizado.push({
          id: this.generateUniqueId(),
          dataHora: new Date().toISOString(),
          statusAnterior: solicitacao.status,
          statusAtual: EstadoSolicitacaoType.APROVADA
        });

        const updatedSolicitacao: Solicitacao = {
          ...solicitacao,
          status: EstadoSolicitacaoType.APROVADA,
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

  getSolicitacaoByIdComHistorico(id: string): Observable<Solicitacao> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao>(`${this.apiUrl}/api/v1/solicitacoes/${id}/historico`, { headers: headers });
  }
}
