import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateTokenGuard } from 'src/app/auth/guard/validate-token.guard';

import { HomeComponent } from '../home/home.component';
import { CalculateOperationComponent } from '../calculate-operation/calculate-operation.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'calculate-operation', component: CalculateOperationComponent,
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ],
  },
  { path: 'home', component: HomeComponent }

]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
