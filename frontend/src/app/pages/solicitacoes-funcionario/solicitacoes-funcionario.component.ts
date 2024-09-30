import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISolicitacao } from '../../model/interfaces/solicitacao.interface';
import { EstadoSolicitacaoType } from '../../model/types/estado-solicitacao.type';
import { I } from '@angular/cdk/keycodes';
import { Solicitacao } from '../../model/classes/Solicitacao';
@Component({
  selector: 'app-solicitacoes-funcionario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './solicitacoes-funcionario.component.html',
  styleUrl: './solicitacoes-funcionario.component.css'
})
export class SolicitacoesFuncionarioComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'cliente', 'data', 'estado', 'button'];
  dataSource: MatTableDataSource<Solicitacao>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    // Cria 100 solicitações
    const solicitacoes = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(solicitacoes);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new Solicitacao. */
function createNewUser(id: number): Solicitacao {
  const name =
    CLIENTES[Math.round(Math.random() * (CLIENTES.length - 1))] +
    ' ' +
    CLIENTES[Math.round(Math.random() * (CLIENTES.length - 1))].charAt(0) +
    '.';
  const estados: EstadoSolicitacaoType[] = ['ORÇADA', 'ARRUMADA', 'REJEITADA', 'APROVADA', 'ABERTA'];
  let solicitacao: Solicitacao = {
    id: id.toString(),
    cliente: name,
    data: DATAS[Math.round(Math.random() * (DATAS.length - 1))].toString(),
    estado: estados[Math.floor(Math.random() * estados.length)]
  };
  return solicitacao;
}

/** Constants used to fill up our data base. */
const CLIENTES: string[] = [
  'João',
  'Maria',
  'José',
  'Ana',
  'Pedro',
  'Lucas',
  'Gabriel',
  'Rafael',
  'Felipe',
  'Gustavo',
  'Bruno',
  'Mateus',
  'Leonardo',
  'Rodrigo',
  'Carlos',
  'Paulo',
  'Ricardo',
  'Eduardo',
  'Henrique',
  'Fernando',
  'Daniel',
  'Thiago',
  'Diego',
  'Vinícius'
];

const DATAS: string[] = [
  '2023-01-01',
  '2023-01-15',
  '2023-02-01',
  '2023-02-15',
  '2023-03-01',
  '2023-03-15',
  '2023-04-01',
  '2023-04-15',
  '2023-05-01',
  '2023-05-15',
  '2023-06-01',
  '2023-06-15',
  '2023-07-01',
  '2023-07-15',
  '2023-08-01',
  '2023-08-15',
  '2023-09-01',
  '2023-09-15',
  '2023-10-01',
  '2023-10-15'
]