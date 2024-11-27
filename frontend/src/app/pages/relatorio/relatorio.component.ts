import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintService } from '../../services/print.service';
import { Router } from '@angular/router';
import { Receita } from '../../model/entities/receita';
import { CategoriaEquipamento } from '../../model/entities/categoria-equipamento';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RelatorioService } from '../../services/relatorio.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatOptionModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CurrencyPipe
  ],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Set locale to Portuguese (Brazil)
  ],
})

export class RelatorioComponent implements OnInit {
  receitas: Receita[] = [];
  filteredReceitas: Receita[] = [];
  categorias: any[] = [];

  form: FormGroup = new FormGroup({
    categoria: new FormControl(''),
    data: new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })
  });

  displayedColumns: string[] = ['categoria', 'data', 'valor'];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    // Fetch pagamentos (Receitas)
    this.relatorioService.getAllPagamentos().subscribe(
      (data) => {
        this.receitas = data;
        this.filteredReceitas = [...this.receitas];
      },
      (error) => {
        console.error('Error fetching pagamentos:', error);
      }
    );

    // Fetch categories
    this.relatorioService.getAllCategories().subscribe(
      (categories) => {
        this.categorias = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit() {
    const filters = this.form.value;
    this.applyFilters(filters);
  }

  applyFilters(filters: any) {
    this.filteredReceitas = [...this.receitas];
  
    if (filters.categoria) {
      this.filteredReceitas = this.filteredReceitas.filter(
        (receita) => receita.categoria && receita.categoria.nome === filters.categoria
      );
    }
  
    if (filters.data?.start && filters.data?.end) {
      const startDate = new Date(filters.data.start);
      const endDate = new Date(filters.data.end);
      endDate.setHours(23, 59, 59, 999);

      this.filteredReceitas = this.filteredReceitas.filter((receita) => {
        const receitaDate = this.receiveDateArray(receita.dataHoraCriacao);
        return receitaDate >= startDate && receitaDate <= endDate;
      });
    }
  }  

  receiveDateArray(dateArray: number[]): Date {
    // Subtract 1 from the month because JavaScript months are zero-based
    const date = new Date(
      dateArray[0],          // Year
      dateArray[1] - 1,      // Month (0-based)
      dateArray[2],          // Day
      dateArray[3],          // Hours
      dateArray[4]           // Minutes
    );
    return date;
  }

  clearFilters() {
    this.form.reset();
    this.filteredReceitas = [...this.receitas];
  }

  printReport() {
    const filters = this.form.value;

    let categoria: string = '';
    if (filters.categoria) {
      categoria = filters.categoria; // filters.categoria is the selected category ID
    }

    const startDate = filters.data?.start ? this.formatDate(filters.data.start) : null;
    const endDate = filters.data?.end ? this.formatDate(filters.data.end) : null;

    this.relatorioService.downloadFaturamentoReport(categoria, startDate, endDate).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Faturamento_Report.pdf';
      a.click();

      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading report', error);
    });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getDateFromReceita(receita: Receita): string {
    const date = new Date(this.receiveDateArray(receita.dataHoraCriacao));
    return date.toLocaleDateString();
  }
}