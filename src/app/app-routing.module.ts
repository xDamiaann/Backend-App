import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/cliente-register/cliente-register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/cliente-login/cliente-login.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { DistribuidorHomeComponent } from './distribuidor-home/distribuidor-home.component';
import { DistribuidorLoginComponent } from './auth/distribuidor-login/distribuidor-login.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-cliente', component: LoginComponent },
  { path: 'login-distribuidor', component: DistribuidorLoginComponent },
  { path: 'login-admin', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'cliente-home', component: ClienteHomeComponent }, //ruta para la pagina de inicio del cliente
  { path: 'distribuidor-home', component: DistribuidorHomeComponent }, //ruta para la pagina de inicio del distribuidor
  { path: 'admin-home', component: AdminHomeComponent } //ruta para la pagina de inicio del admin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
