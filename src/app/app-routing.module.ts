import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedGuard, loginGuard } from '@core/guards';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    async loadComponent() {
      const { LoginComponent } = await import('./pages/login/login.component');
      return LoginComponent;
    },
  },
  {
    path: 'home',
    canActivate: [loggedGuard],
    async loadComponent() {
      const { HomeComponent } = await import('./pages/home/home.component');
      return HomeComponent;
    },
  },
  {
    path: 'responsibilities',
    canActivate: [loggedGuard],
    async loadComponent() {
      const { ResponsibilitiesComponent } = await import('./pages/responsibilities/responsibilities.component');
      return ResponsibilitiesComponent;
    },
  },
  {
    path: 'inventory',
    canActivate: [loggedGuard],
    async loadComponent() {
      const { InventoryComponent } = await import('./pages/inventory/inventory.component');
      return InventoryComponent;
    },
  },
  {
    path: 'collection',
    canActivate: [loggedGuard],
    async loadComponent() {
      const { CollectionComponent } = await import('./pages/collection/collection.component');
      return CollectionComponent;
    },
  },
  {
    path: 'settings',
    canActivate: [loggedGuard],
    async loadComponent() {
      const { SettingsComponent } = await import('./pages/settings/settings.component');
      return SettingsComponent;
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
