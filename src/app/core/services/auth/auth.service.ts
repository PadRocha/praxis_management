import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';
import { IUser } from '@core/models';
import { invoke } from '@tauri-apps/api';
import { from } from 'rxjs';
// import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // protected url: String;
  private headersJSON: HttpHeaders;

  constructor(
    protected http: HttpClient,
    // protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: InjectionToken<Object>
  ) {
    // this.url = environment.httpUrl;
    this.headersJSON = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
  }

  setToken(value: string, expiry = true): void {
    const now = new Date();
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = { value, expiry: expiry ? now.getTime() + 86_400_000 : false };
    if (isPlatformBrowser(this.platformId))
      sessionStorage.setItem('token', JSON.stringify(item));
  }

  login(user: IUser) {
    return from(invoke('login', {
      user: user.sub,
      password: user.password
    }));
    // const params = JSON.stringify(user);
    // return this.http.post<{ token: string }>(`/login`, params, {
    //   headers: this.headersJSON,
    // });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) sessionStorage.removeItem('token');
    // this.router.navigate(['/login']);
  }

  get getToken(): string | null {
    const token = isPlatformBrowser(this.platformId)
      ? sessionStorage.getItem('token')
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
      ? !!sessionStorage.getItem('token')
      : false;
  }
}
