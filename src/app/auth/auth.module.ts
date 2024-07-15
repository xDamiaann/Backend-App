import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './cliente-register/cliente-register.component';
import { LoginComponent } from './cliente-login/cliente-login.component';
import { DistribuidorLoginComponent } from './distribuidor-login/distribuidor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuGeneralComponent } from "../shared/menu-general/menu-general.component";
import { FooterComponent } from "../shared/footer/footer.component";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    DistribuidorLoginComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuGeneralComponent,
    FooterComponent
  ]
})
export class AuthModule { }
