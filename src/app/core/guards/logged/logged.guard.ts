import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard {
  constructor(
    private user: UserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this.user.userSync.pipe(
      map(({ identifier }) => {
        if (!!identifier) {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      }),
    );
  }
}
