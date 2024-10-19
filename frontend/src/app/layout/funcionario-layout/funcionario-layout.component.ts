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
    this.router.navigate(['worker/solicitacoes']);
  }

  goLogout() {
    this.router.navigate(['logout']);
  }

  goHome() {
    this.router.navigate(['worker']);
  }
}
