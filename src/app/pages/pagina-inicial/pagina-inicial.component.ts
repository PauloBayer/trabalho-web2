import { Component } from '@angular/core';
import { ISolicitacao } from '../../model/interfaces/solicitacao.interface';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {
  solicitacoes: ISolicitacao[] = [
    { data: "2024-09-13T14:30:00Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "ORÇADA" },
    { data: "2023-07-21T09:15:45Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "ARRUMADA" },
    { data: "2025-12-31T23:59:59Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "REJEITADA" },
    { data: "2022-01-01T00:00:00Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "APROVADA" },
    { data: "2024-09-13T14:30:00Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "ORÇADA" },
    { data: "2024-09-13T14:30:00Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "ORÇADA" },
    { data: "2025-12-31T23:59:59Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "REJEITADA" },
    { data: "2022-01-01T00:00:00Z", descricao: "lorem ipsum ergo sutum lorem ipsum", estado: "APROVADA" }
  ]

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
  
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}h${minutes}`;
  } 
}
