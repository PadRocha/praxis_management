import { isPlatformBrowser } from '@angular/common';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

@Injectable()
export class LocationInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!isPlatformBrowser(this.platformId) || !localStorage.getItem('location'))
      return next.handle(req);
    // const tokenizedReq = req.clone({
    //   headers: req.headers.set('location', localStorage.getItem('location') as string),
    // });
    const tokenizedReq = req.clone({
      setHeaders: {
        location: localStorage.getItem('location') as string,
      }
    });
    return next.handle(tokenizedReq);
  }
}
