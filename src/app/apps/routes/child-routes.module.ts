import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ValidarTokenGuard } from '../../auth/guard/validar-token.guard';

// import { OperationComponent } from '../operation/operation.component';
import { HomeComponent } from '../home/home.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
/*   { 
    path: 'calculate-operation', component: OperationComponent,
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ],
  }, */
  { path: 'home', component: HomeComponent }

]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
