import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const is_logged = inject(AuthService).loggedIn;
  if (is_logged)
    router.navigate(['/home']);
  return !is_logged;
};
