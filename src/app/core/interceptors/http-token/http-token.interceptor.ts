import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private _auth: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const tokenizedReq = req.clone({
    //   headers: req.headers.set('Authorization', `Bearer ${this._auth.getToken}`),
    // });
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._auth.getToken}`,
      }
    });
    return next.handle(tokenizedReq);
  }
}
