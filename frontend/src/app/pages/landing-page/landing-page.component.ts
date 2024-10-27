import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {

  isLoggedIn = false;
  isEmployee = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
      if (localStorage.getItem('token')) {
        this.isLoggedIn = true;
      }

      if (localStorage.getItem('userRole') === 'ROLE_FUNCIONARIO') {
        this.isEmployee = true;
      }

      console.log(this.isEmployee);
  }

  goLogin() {

    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
    } else {
      if (this.isEmployee) {
        this.router.navigate(['funcionario']);
      } else {
        this.router.navigate(['client']);
      }
    }
  }
}
