import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@core/services';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  constructor(
    private user: UserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this.user.userSync.pipe(
      map(() => {
        if (this.user.hasRole('EDIT', 'GRANT', 'ADMIN')) {
          return true;
        }

        this.router.navigate(['/home']);
        return false;
      }),
    );
  }
}
