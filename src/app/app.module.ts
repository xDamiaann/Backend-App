import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { DistribuidorHomeComponent } from './distribuidor-home/distribuidor-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SolicitudDistribuidorComponent } from './distribuidor/solicitud-distribuidor/solicitud-distribuidor.component';
import { AdminSolicitudesComponent } from './admin/admin-solicitudes/admin-solicitudes.component';
import {AdminServiceService} from './admin/admin-service.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteHomeComponent,
    DistribuidorHomeComponent,
    AdminHomeComponent,
    SolicitudDistribuidorComponent,
    AdminSolicitudesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule, // Asegúrate de agregar esta línea
    AuthModule,
  ],
  providers: [AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
