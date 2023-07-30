import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainAppsRoutingModule } from './main-apps-routing.module';
import { MainAppsComponent } from './main-apps.component';
import { MaterialDesignModule } from 'src/app/design/material-design.module';
import { HomeComponent } from './home/home.component';
import { CalculateOperationComponent } from './calculate-operation/calculate-operation.component';
import { BasicComponent } from './calculate-operation/basic/basic.component';
import { SquareRootComponent } from './calculate-operation/square-root/square-root.component';
import { RandomStringComponent } from './calculate-operation/random-string/random-string.component';
import { TableRecordComponent } from './table-record/table-record.component';


@NgModule({
  declarations: [
    MainAppsComponent,
    HomeComponent,
    CalculateOperationComponent,
    BasicComponent,
    SquareRootComponent,
    RandomStringComponent,
    TableRecordComponent,
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
