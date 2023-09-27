import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpTokenInterceptor, LocationInterceptor } from './interceptors';
import { AuthService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  // providers: [
  //   AuthService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: HttpTokenInterceptor,
  //     multi: true,
  //   },
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: LocationInterceptor,
  //     multi: true,
  //   }
  // ],
})
export class CoreModule { }
