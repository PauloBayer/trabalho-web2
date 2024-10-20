import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { ICategoriaEquipamento } from '../../model/entities/categoria-equipamento.interface';
import { categoriasSeed } from '../../seeds/seed';

interface Receita {
  data: Date;
  valor: number;
}

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionando os módulos aqui
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'], // Corrigido para styleUrls
})
export class RelatorioComponent {
  categorias: ICategoriaEquipamento[] = categoriasSeed;
 
  receitas: Receita[] = [];

  constructor() {
    // Exemplo de dados de receita
    this.receitas = [
      { data: new Date('2024-10-01'), valor: 1500 },
      { data: new Date('2024-10-01'), valor: 1000 },
      { data: new Date('2024-10-02'), valor: 2000 },
      { data: new Date('2024-10-03'), valor: 500 },
    ];
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
      data: new Date(data),
      valor,
    }));
  }
}