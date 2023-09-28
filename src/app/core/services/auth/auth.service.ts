import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@core/models';
import { invoke } from '@tauri-apps/api';
import { Observable, from, map } from 'rxjs';
// import { environment } from '@environment';

type User = {
  _id: {
    $oid: any;
  };
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    protected http: HttpClient,
    protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: InjectionToken<Object>
  ) { }

  setToken({ $oid }: User['_id'], expiry = true): void {
    const now = new Date();
    const item = { value: $oid, expiry: expiry ? now.getTime() + 86_400_000 : false };
    if (isPlatformBrowser(this.platformId))
      sessionStorage.setItem('id', JSON.stringify(item));
  }

  login(user: { nickname: string, password: string }): Observable<User> {
    return from(invoke<User>('login', user));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) sessionStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  get getToken(): string | null {
    const token = isPlatformBrowser(this.platformId)
      ? sessionStorage.getItem('id')
      : null;
    if (!token) return null;

    const { expiry, value } = JSON.parse(token);
    const now = new Date();
    if (!!expiry && now.getTime() > expiry) {
      this.logout();
      return null;
    }

    return value ?? null;
  }

  get loggedIn(): boolean {
    return isPlatformBrowser(this.platformId)
      ? !!sessionStorage.getItem('id')
      : false;
  }
}
