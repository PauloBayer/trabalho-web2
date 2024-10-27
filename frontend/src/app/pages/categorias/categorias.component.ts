import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoriaEquipamento } from '../../model/entities/categoria-equipamento';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatSidenavModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<CategoriaEquipamento>([]);
  columnsToDisplay = ['number', 'name', 'description', 'actions'];
  expandedCategory: CategoriaEquipamento | null = null;

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {
    this.categoryService.getCategories().subscribe({
      next: (data: CategoriaEquipamento[]) => {
        this.dataSource.data = data;  // Atribui os dados corretamente
      },
      error: (data) => alert('ERROR: ' + data)
    });
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
  
  findIndexOfElement(element: string) {
    return this.dataSource.data.findIndex((item) => item.name === element) + 1;
  }

  openDialog() {
    this.dialog
      .open(CategoriaDialog, {
        minHeight: '250px',
        minWidth: '500px',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const newCategory: CategoriaEquipamento = {
            name: data.name,
            description: data.description,
          };
          this.categoryService.addCategory(newCategory).subscribe(() => {
            this.categoryService.getCategories().subscribe({
              next: (categories) => {
                this.dataSource.data = categories;
              },
              error: (error) => alert('ERROR: ' + error)
            });
          });
        }
      });
  }
  

  openEditDialog(category: CategoriaEquipamento) {
    this.dialog
      .open(CategoriaDialog, {
        minHeight: '250px',
        minWidth: '500px',
        data: { category },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const updatedCategory: CategoriaEquipamento = {
            name: data.name,
            description: data.description,
          };
          this.categoryService.updateCategory(updatedCategory).subscribe(() => {
            this.categoryService.getCategories().subscribe({
              next: (categories) => {
                this.dataSource.data = categories;
              },
              error: (error) => alert('ERROR: ' + error)
            });
          });
        }
      });
  }
  

  deleteCategory(categoryName: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryName).subscribe(() => {
        this.categoryService.getCategories().subscribe({
          next: (categories) => {
            this.dataSource.data = categories;
          },
          error: (error) => alert('ERROR: ' + error)
        });
      });
    }
  }
  

  toggleExpand(element: CategoriaEquipamento) {
    this.expandedCategory = this.expandedCategory === element ? null : element;
  }

}

@Component({
  selector: 'categoria-form',
  templateUrl: './components/categoria-form.component.html',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogActions,
    MatButtonModule,
    CommonModule,
    MatDialogClose
  ],
})
export class CategoriaDialog implements OnInit {
  categoriaForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CategoriaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { category?: CategoriaEquipamento }
  ) {
    this.categoriaForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(2000),
      ]),
    });
  }

  ngOnInit() {
    if (this.data && this.data.category) {
      // Editing existing category
      this.categoriaForm.patchValue({
        name: this.data.category.name,
        description: this.data.category.description,
      });
      this.isEditing = true;
    }
  }

  closeDialog() {
    if (this.categoriaForm.valid) {
      const formValue = this.categoriaForm.getRawValue();
      this.dialogRef.close(formValue);
    }
  }
}