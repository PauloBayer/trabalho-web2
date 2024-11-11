import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatNativeDateModule
  ],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  categorias: CategoriaEquipamento[] = [];
  categoriaSelecionada: string = 'Todas as categorias';
  receitas: Receita[] = [];
  form: FormGroup = new FormGroup({
    categoria: new FormControl(''),
    data: new FormControl(new Date())
  })

  ngOnInit(): void {
    this.categorias = this.relatorioService.getAllCategories();
  }

  constructor(
    private printService: PrintService,
    private router: Router,
    private relatorioService: RelatorioService
  ) {
  // Gerando 10 registros de exemplo
  for (let i = 0; i < 10; i++) {
    const randomDate = new Date(2024, 9, Math.floor(Math.random() * 31) + 1); // Outubro de 2024
    const randomValue = Math.floor(Math.random() * 5000) + 500; // Valor entre 500 e 5500
    const categoria = this.categorias[Math.floor(Math.random() * this.categorias.length)] || 'Categoria Exemplo';
    this.receitas.push({ categoria: categoria.name, data: randomDate, valor: randomValue });
    }
  }

  onSubmit() {
    const inicio = this.form.value.dataInicial;
    const fim = this.form.value.dataInicial;

    this.receitas = this.receitas.filter((receita) => {
      return receita.data >= inicio && receita.data <= fim;
    });

    // Agrupando por dia
    const receitasAgrupadas: { [key: string]: number } = {};
    this.receitas.forEach((receita) => {
      const dataKey = receita.data.toISOString().split('T')[0];
      if (!receitasAgrupadas[dataKey]) {
        receitasAgrupadas[dataKey] = 0;
      }
      receitasAgrupadas[dataKey] += receita.valor;
    });

    this.receitas = Object.entries(receitasAgrupadas).map(([data, valor]) => ({
      categoria: 'Agrupado',
      data: new Date(data),
      valor,
    }));
  }

  printReport() {
    this.printService.setPrintData(this.receitas);
    this.router.navigate(['/print']);
  }
}