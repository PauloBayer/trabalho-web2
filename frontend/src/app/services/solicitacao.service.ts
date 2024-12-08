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
import { EfetuarManutencaoRequestDto } from '../model/requests/efetuar-manutencao-dto';

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
    return this.httpClient.get<Solicitacao[]>(`${this.apiUrl}/api/v1/solicitacoes/user`, { headers: headers });
  }

  findAllSolicitacoes(): Observable<Solicitacao []> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao[]>(`${this.apiUrl}/api/v1/solicitacoes`, { headers: headers });
  }

  getSolicitacaoById(id: string): Observable<Solicitacao> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao>(`${this.apiUrl}/api/v1/solicitacoes/${id}`, { headers: headers });
  }

  criarSolicitacao(descricaoEquipamento: string, descricaoDefeito: string, categoriaEquipamento: CategoriaEquipamento): Observable<null> {
    
    const dataHora = new Date().toISOString();

    let isLogged = localStorage.getItem('token');
    let userRole = localStorage.getItem('userRole');
    let user = localStorage.getItem('userLogado');

    if (!isLogged)
      return throwError(() => new Error(`Não autorizado: nenhum usuário está logado`));

    if (userRole != 'ROLE_CLIENTE')
      return throwError(() => new Error(`Não autorizado: funcionários não podem criar solicitações`));

    let solicitacao: Solicitacao = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      categoriaEquipamento: categoriaEquipamento.nome,
      descricaoDefeito: descricaoDefeito,
      orientacoesExtrasOrcamento: '',
      descricaoEquipamento: descricaoEquipamento,
      descricaoOrcamento: '',
      dataHoraCriacao: dataHora,
      cliente: JSON.parse(user!) as Cliente,
      status: EstadoSolicitacaoType.ABERTA,
      historico: [{
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        dataHora: dataHora,
        statusAtual: EstadoSolicitacaoType.ABERTA,
        descricaoDefeito: descricaoDefeito,
        descricaoEquipamento: descricaoEquipamento,
      }]
    };

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });

    return this.httpClient.post<null>(`${this.apiUrl}/api/v1/solicitacoes/manutencao`, solicitacao, { headers: headers });

  }

  efetuarOrcamento(id: string, valorOrcado: number, orientacoesExtras: string): Observable<null> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    const body = { valorOrcado: valorOrcado, orientacoesExtras: orientacoesExtras };
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/orcamento`, body, { headers: headers });
  }

  aprovarServico(id: string): Observable<null> {

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/aprovar`, "", { headers: headers });

  }

  rejeitarServico(id: string, motivoRejeicao: string): Observable<null> {

    var body = { motivoRejeicao: motivoRejeicao };

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/rejeitar`, body, { headers: headers });

  }

  redirecionarManutencao(idSolicitacao: string, funcionarioDestino: Funcionario): Observable<null> {

    let idFuncionarioDestino = funcionarioDestino.id;

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${idSolicitacao}/redirecionar/${idFuncionarioDestino}`, "", { headers: headers });

  }

  efetuarManutencao(id: string, descricaoManutencao: string, orientacoesManutencao: string): Observable<null> {
    
    let body: EfetuarManutencaoRequestDto = {
      orientacoesManutencao: orientacoesManutencao,
      descricaoManutencao: descricaoManutencao
    };

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<any>(`${this.apiUrl}/api/v1/solicitacoes/${id}/manutencao`, body, { headers: headers });

  }

  pagarServico(id: string): Observable<null> {

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/pagar`, "", { headers: headers });

  }

  finalizarSolicitacao(id: string): Observable<null> {

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/finalizar`, "", { headers: headers });

  }

  resgatarServico(id: string): Observable<null> {

    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.put<null>(`${this.apiUrl}/api/v1/solicitacoes/${id}/resgatar`, "", { headers: headers });

  }

  getSolicitacaoByIdComHistorico(id: string): Observable<Solicitacao> {
    const bearerToken = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    return this.httpClient.get<Solicitacao>(`${this.apiUrl}/api/v1/solicitacoes/${id}/historico`, { headers: headers });
  }
}
