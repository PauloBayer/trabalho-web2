import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Funcionario } from '../../model/entities/funcionario';
import { MatDialog } from '@angular/material/dialog';
import { CriarAltFuncComponent } from './criar-alt-func/criar-alt-func.component';
import { DeleteFuncComponent } from './delete-func/delete-func.component';
import { FuncionarioService } from '../../services/funcionario.service';

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
    'dataNascimento',
    'Ações',
  ];
  dataSource: MatTableDataSource<any>;
  funcionarios: Funcionario[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public funcionarioService: FuncionarioService
  ) {
    this.dataSource = new MatTableDataSource(this.funcionarios);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.funcionarioService.findAll().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
      this.dataSource.data = this.funcionarios;
    });
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
