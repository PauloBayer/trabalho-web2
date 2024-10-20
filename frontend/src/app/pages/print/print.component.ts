import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintService } from '../../services/print.service';
import { Receita } from '../../model/entities/receita';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
  receitas: Receita[] = [];

  constructor(
    private printService: PrintService,
    private router: Router
  ) {
    this.receitas = this.printService.getPrintData();
  }

  ngOnInit(): void {
    // Após carregar os dados, abrir a janela de impressão
    console.log(this.receitas)
    setTimeout(() => {
      window.print();
      this.router.navigate(['funcionario', 'relatorio']);
    }, 0);
  }
}
