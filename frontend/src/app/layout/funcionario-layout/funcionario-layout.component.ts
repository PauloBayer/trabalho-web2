import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-funcionario-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './funcionario-layout.component.html',
  styleUrl: './funcionario-layout.component.css',
})
export class FuncionarioLayoutComponent {
  
  constructor(private router: Router) {}

  goToSolicitacoes() {
    this.router.navigate(['funcionario/solicitacoes']);
  }

  goHome() {
    this.router.navigate(['funcionario']);
  }

  goLogout() {
    this.router.navigate(['logout']);
  }

  goToCategorias() {
    this.router.navigate(['funcionario/categorias']);
  }

  goToFuncionarios() {
    this.router.navigate(['funcionario/funcionarios']);
  }

  
  goToRelatorios() {
    this.router.navigate(['funcionario/relatorio']);
  }
}
