import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedGuard, loginGuard } from '@core/guards';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [loggedGuard],
    async loadComponent() {
      const { HomeComponent } = await import('./pages/home/home.component');
      return HomeComponent;
    },
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    async loadComponent() {
      const { LoginComponent } = await import('./pages/login/login.component');
      return LoginComponent;
    },
  },
  {
    path: '**',
    redirectTo: '/home',
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
