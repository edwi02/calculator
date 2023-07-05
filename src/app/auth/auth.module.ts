import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialDesignModule } from '../design/material-design.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ]
})
export class AuthModule { }
