import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { categoriasSeed } from '../../seeds/seed';
import { PrintService } from '../../services/print.service';
import { Router } from '@angular/router';
import { Receita } from '../../model/entities/receita';
import { CategoriaEquipamento } from '../../model/entities/categoria-equipamento';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionando os módulos aqui
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'], // Corrigido para styleUrls
})
export class RelatorioComponent {
  categorias: CategoriaEquipamento[] = [];
  categoriaSelecionada: string = 'Todas as categorias';

  ngOnInit(): void {
    this.categorias = categoriasSeed;
  }
  receitas: Receita[] = [];

  constructor(
    private printService: PrintService,
    private router: Router
  ) {
  // Gerando 50 registros de exemplo
  for (let i = 0; i < 10; i++) {
    const randomDate = new Date(2024, 9, Math.floor(Math.random() * 31) + 1); // Outubro de 2024
    const randomValue = Math.floor(Math.random() * 5000) + 500; // Valor entre 500 e 5500
    const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    const categoria = categorias[Math.floor(Math.random() * categorias.length)] || 'Categoria Exemplo';
    this.receitas.push({ categoria: categoria.name, data: randomDate, valor: randomValue });
    }
  }

  onSubmit(dataInicial: string, dataFinal: string) {
    const inicio = dataInicial ? new Date(dataInicial) : new Date(0);
    const fim = dataFinal ? new Date(dataFinal) : new Date();

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