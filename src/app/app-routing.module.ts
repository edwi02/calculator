import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppsRoutingModule } from './apps/main-apps-routing.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'main',
    loadChildren: () => import('./apps/main-apps.module').then( m => m.MainAppsModule )
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainAppsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
