import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cliente-layout.component.html',
  styleUrl: './cliente-layout.component.css',
})
export class ClienteLayoutComponent {
  constructor(private router: Router) {}

  goToSolicitacoes() {
    this.router.navigate(['client/solicitacoes']);
  }

  goToMakeSolicitacoes() {
    this.router.navigate(['client/solicitacao-manutencao']);
  }

  goHome() {
    this.router.navigate(['client']);
  }

  goLogout() {
    this.router.navigate(['logout']);
  }
}
