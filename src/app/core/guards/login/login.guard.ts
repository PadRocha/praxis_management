import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    if (this.auth.loggedIn) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
