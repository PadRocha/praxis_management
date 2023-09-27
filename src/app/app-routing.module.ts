import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditGuard, LoggedGuard, LoginGuard } from '@core/guards';

const routes: Routes = [
  {
    path: 'login',
    // canActivate: [() => inject(LoginGuard).canActivate()],
    async loadComponent() {
      const { LoginComponent } = await import('./pages/login/login.component');
      return LoginComponent;
    },
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
