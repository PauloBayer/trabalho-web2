import { Injectable } from '@angular/core';
import { ISolicitacao } from '../model/interfaces/solicitacao.interface';
import { ICategoriaEquipamento } from '../model/interfaces/categoria-equipamento.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor() {}

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
      descricaoEquipameto: descricaoEquipamento,
      data: new Date().toISOString(),
      estado: 'ABERTA'
    });

    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    return of(null);
  }

  getCategoriasEquipamento(): Observable<ICategoriaEquipamento []> {
    return of([
      { value: 'notebook', view: 'Notebook' },
      { value: 'desktop', view: 'Desktop' },
      { value: 'impressora', view: 'Impressora' },
      { value: 'mouse', view: 'Mouse' },
      { value: 'teclado', view: 'Teclado' },
    ]);
  }
}
