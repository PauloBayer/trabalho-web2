import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  goHomepage() {
    this.authService.navigateToHomepageByRole();
  }
  
  goLogin() {
    this.router.navigate(['login']);
  }
  
  goRegister() {
    this.router.navigate(['register']);
  }

  goLogout() {
    this.router.navigate(['logout']);
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}
