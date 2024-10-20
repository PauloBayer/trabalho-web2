import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EstadoSolicitacaoType } from '../../model/entities/estado-solicitacao.type';
import { Router, RouterModule } from '@angular/router';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { DatePipe, SlicePipe } from '@angular/common';
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
    MatTooltipModule,
    DatePipe,
    SlicePipe,
    MatTooltipModule
  ],
  templateUrl: './solicitacoes-funcionario.component.html',
  styleUrl: './solicitacoes-funcionario.component.css',
})
export class SolicitacoesFuncionarioComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'cliente', 'data', 'estado', 'button'];

  dataSource!: MatTableDataSource<ISolicitacao>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router: Router, private solicitacoesService: SolicitacaoService) {
    this.solicitacoesService.findAllSolicitacoes().subscribe({
      next: (data: ISolicitacao []) => {
        this.dataSource = new MatTableDataSource(data);
      },
      error: (error) => {
        console.log('erro: ', error);
      }
    })
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
  onEfetuar() {
    this.router.navigate(['funcionario', 'efetuar']);
  }
}
