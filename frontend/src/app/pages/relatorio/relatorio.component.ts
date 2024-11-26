import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { categoriasSeed } from '../../seeds/seed';
import { PrintService } from '../../services/print.service';
import { Router } from '@angular/router';
import { Receita } from '../../model/entities/receita';
import { CategoriaEquipamento } from '../../model/entities/categoria-equipamento';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RelatorioService } from '../../services/relatorio.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CurrencyPipe
  ],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  categorias: CategoriaEquipamento[] = [];
  categoriaSelecionada: string = 'Todas as categorias';
  receitas: Receita[] = [];
  filteredReceitas: Receita[] = [];
  form: FormGroup = new FormGroup({
    categoria: new FormControl(''),
    data: new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })
  });  
  displayedColumns: string[] = ['categoria', 'data', 'valor'];

  constructor(
    private printService: PrintService,
    private router: Router,
    private relatorioService: RelatorioService
  ) {
    this.categorias = this.relatorioService.getAllCategories();
    // Gerando 10 registros de exemplo
    for (let i = 0; i < 10; i++) {
      const randomDate = new Date(2024, 9, Math.floor(Math.random() * 31) + 1); // Outubro de 2024
      const randomValue = Math.floor(Math.random() * 5000) + 500; // Valor entre 500 e 5500
      const randomCategory = this.categorias.length ? this.categorias[Math.floor(Math.random() * this.categorias.length)].name : '';
      this.receitas.push({ categoria: randomCategory, data: randomDate, valor: randomValue });
    }
  }

  ngOnInit(): void {
    this.filteredReceitas = [...this.receitas];
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

  onSubmit() {
    const filters = this.form.value;
    this.applyFilters(filters);
  }

  applyFilters(filters: any) {
    this.filteredReceitas = [...this.receitas];

    if (filters.categoria) {
      this.filteredReceitas = this.filteredReceitas.filter(receita => receita.categoria === filters.categoria);
    }

    if (filters.data?.start && filters.data?.end) {
      const startDate = new Date(filters.data.start);
      const endDate = new Date(filters.data.end);

      this.filteredReceitas = this.filteredReceitas.filter(receita => {
        const receitaDate = new Date(receita.data);
        return receitaDate >= startDate && receitaDate <= endDate;
      });
    }
  }

  printReport() {
    const filters = this.form.value;

    let categoriaIds: string[] = [];
    if (filters.categoria) {
      categoriaIds.push(filters.categoria); // filters.categoria is the selected category ID
    }

    const startDate = filters.data?.start ? this.formatDate(filters.data.start) : null;
    const endDate = filters.data?.end ? this.formatDate(filters.data.end) : null;

    this.relatorioService.downloadFaturamentoReport(categoriaIds, startDate, endDate).subscribe(response => {
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

  getTotalCost() {
    return this.filteredReceitas.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  clearFilters() {
    this.form.reset();
    this.filteredReceitas = [...this.receitas];
  }
}
