import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IFuncionario } from '../../model/interfaces/funcionario.interface';
import { MatDialog } from '@angular/material/dialog';
import { CriarAltFuncComponent } from './criar-alt-func/criar-alt-func.component';
import { DeleteFuncComponent } from './delete-func/delete-func.component';

@Component({
  selector: 'app-funcionarios',
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
  ],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css',
})
export class FuncionariosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'data_nascimento',
    'Ações',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([
      {
        id: '1',
        nome: 'João',
        email: 'joao@mail.com',
        data_nascimento: '01/01/2000',
        senha: '123mudar',
      },
      {
        id: '2',
        nome: 'Maria',
        email: 'maria@mail.com',
        data_nascimento: '02/02/1990',
        senha: '123mudar',
      },
    ]);
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

  criarFunc(): void {
    const dialogRef = this.dialog.open(CriarAltFuncComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Adicionar novo funcionário
        this.dataSource.data = [
          ...this.dataSource.data,
          { id: this.dataSource.data.length + 1, ...result },
        ];
      }
    });
  }

  altFunc(funcionario: any): void {
    const dialogRef = this.dialog.open(CriarAltFuncComponent, {
      width: '500px',
      data: { funcionario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Atualizar funcionário
        const index = this.dataSource.data.findIndex(
          (f) => f.id === funcionario.id
        );
        this.dataSource.data[index] = { ...funcionario, ...result };
        this.dataSource._updateChangeSubscription(); // Atualizar tabela
      }
    });
  }

  deleteFunc(funcionario: any): void {
    const dialogRef = this.dialog.open(DeleteFuncComponent, {
      width: '500px',
      data: { nome: funcionario.nome },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Excluir funcionário
        this.dataSource.data = this.dataSource.data.filter(
          (f) => f.id !== funcionario.id
        );
      }
    });
  }
}
