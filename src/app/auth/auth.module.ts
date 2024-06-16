import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './cliente-register/cliente-register.component';
import { LoginComponent } from './cliente-login/cliente-login.component';
import { DistribuidorLoginComponent } from './distribuidor-login/distribuidor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    DistribuidorLoginComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule { }
