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

  constructor(private router: Router) { }

  goToSolicitacoes() {
    this.router.navigate(['solicitacoes']);
  }

  goHome() {
    this.router.navigate(['']);
  }

}
