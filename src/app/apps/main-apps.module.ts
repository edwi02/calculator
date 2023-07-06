import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainAppsRoutingModule } from './main-apps-routing.module';
import { MainAppsComponent } from './main-apps.component';
import { MaterialDesignModule } from 'src/app/design/material-design.module';
import { HomeComponent } from './home/home.component';
import { CalculateOperationComponent } from './calculate-operation/calculate-operation.component';


@NgModule({
  declarations: [
    MainAppsComponent,
    HomeComponent,
    CalculateOperationComponent,
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainAppsRoutingModule,
  ]
})
export class MainAppsModule { }
