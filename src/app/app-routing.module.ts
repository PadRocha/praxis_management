import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
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
