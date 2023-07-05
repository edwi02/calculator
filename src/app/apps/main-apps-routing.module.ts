import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAppsComponent } from './main-apps.component';

const childRoutes: Routes = [
  {
      path: '',
      component: MainAppsComponent,
      // canActivate: [ ValidarTokenGuard ],
      // canLoad: [ ValidarTokenGuard ],
      loadChildren: () => import('./routes/child-routes.module').then( m => m.ChildRoutesModule )
  }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class MainAppsRoutingModule { }
