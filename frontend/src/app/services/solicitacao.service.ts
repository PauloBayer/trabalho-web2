import { Injectable } from '@angular/core';
import { ICategoriaEquipamento } from '../model/entities/categoria-equipamento.interface';
import { Observable, of } from 'rxjs';
import { EstadoSolicitacaoType } from '../model/entities/estado-solicitacao.type';
import { ISolicitacao } from '../model/entities/solicitacao.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor() {}

  // apagar metodo depois que tiver a API
  seed() {
    const estados: EstadoSolicitacaoType[] = ['ABERTA', 'ORCADA', 'AGUARDANDO_PAGAMENTO', 'REJEITADA', 'APROVADA'];
    
    const solicitacoes = estados.map(estado => ({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      categoriaEquipamento: 'Categoria ' + estado,
      descricaoDefeito: 'Defeito em estado ' + estado,
      descricaoEquipameto: 'Equipamento ' + estado,
      data: new Date().toISOString(),
      estado: estado
    }));
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  }

  findAllSolicitacoes(): Observable<ISolicitacao []> {
    let solicitacoesString = localStorage.getItem('solicitacoes');  
    return of(solicitacoesString ? JSON.parse(solicitacoesString) : []);
  }

  criarSolicitacao(descricaoEquipamento: string, descricaoDefeito: string, categoriaEquipamento: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
    
    solicitacoes.push({
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      categoriaEquipamento: categoriaEquipamento,
      descricaoDefeito: descricaoDefeito,
      descricaoEquipamento: descricaoEquipamento,
      dataHoraCriacao: new Date().toISOString(),
      status: 'ABERTA',
      historico: []
    });

    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    return of(null);
  }

  getCategoriasEquipamento(): Observable<ICategoriaEquipamento []> {
    return of([
      { name: 'notebook', description: 'Notebook' },
      { name: 'desktop', description: 'Desktop' },
      { name: 'impressora', description: 'Impressora' },
      { name: 'mouse', description: 'Mouse' },
      { name: 'teclado', description: 'Teclado' },
    ]);
  }

  aprovarServico(id: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id)
        return { ...solicitacao, estado: 'APROVADA' };
      return solicitacao;
    });
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }

  rejeitarServico(id: string): Observable<null> {
    let solicitacoesString = localStorage.getItem('solicitacoes');
    let solicitacoes: ISolicitacao[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
  
    solicitacoes = solicitacoes.map(solicitacao => {
      if (solicitacao.id === id)
        return { ...solicitacao, estado: 'REJEITADA' };
      return solicitacao;
    });
  
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  
    return of(null);
  }
}
