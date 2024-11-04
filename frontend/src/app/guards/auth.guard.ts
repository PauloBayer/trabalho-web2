import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data?.['role'];

  if (authService.isLoggedIn()) {
    const userRole = authService.getUserRole();

    if (requiredRole && userRole !== requiredRole) {
      router.navigate(['not-found']);
      return false;
    }

    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
