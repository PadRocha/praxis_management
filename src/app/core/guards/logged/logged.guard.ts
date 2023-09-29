import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@core/services';
import { map } from 'rxjs';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(UserService).userSync.pipe(
    map(({ _id }) => {
      if (!!_id)
        return true;
      router.navigate(['/login']);
      return false;
    }),
  );;
};
