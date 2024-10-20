import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  constructor (private authService: AuthService, private router: Router) {}

  goBackToHomepage() {
    const userRole = this.authService.getUserRole();

    if (userRole === 'ROLE_CLIENTE')
      this.router.navigate(['client']);

    if (userRole === 'ROLE_FUNCIONARIO')
      this.router.navigate(['funcionario']);

    this.router.navigate(['']);
  }
}
