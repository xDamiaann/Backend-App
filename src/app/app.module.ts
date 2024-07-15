import { NgModule, isDevMode } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
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
import { AdminServiceService } from './admin/admin-service.service';
import { AdminParroquiasComponent } from './admin/admin-parroquias/admin-parroquias.component';
import { AdminBarriosComponent } from './admin/admin-barrios/admin-barrios.component';
import { AdminEstadoPedidosComponent } from './admin/admin-estado-pedidos/admin-estado-pedidos.component';
import { AdminEstadoSolicitudesComponent } from './admin/admin-estado-solicitudes/admin-estado-solicitudes.component';
import { AdminPresentacionesComponent } from './admin/admin-presentaciones/admin-presentaciones.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { ClientePedidoComponent } from './cliente/cliente-pedido/cliente-pedido.component';
import { MmodalComponent } from './shared/mmodal/mmodal.component';
import { AdminAbastecerComponent } from './admin/admin-abastecer/admin-abastecer.component';
import { DistribuidorPedidosComponent } from './distribuidor/distribuidor-pedidos/distribuidor-pedidos/distribuidor-pedidos.component';
import { ClientePedidosComponent } from './cliente/cliente-pedidos/cliente-pedidos/cliente-pedidos.component';
import { FacturasAllComponent } from './facturacion/components/facturas-all/facturas-all.component';
import { DetalleFacturaComponent } from './facturacion/components/detalle-factura/detalle-factura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagoConfirmadoComponent } from './facturacion/pago-confirmado/pago-confirmado.component';
//import { ServiceWorkerModule } from '@angular/service-worker';

//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapaComponent } from './distribuidor/mapa/mapa.component';
import { DistribuidorProfileComponent } from './distribuidor/distribuidor-profile/distribuidor-profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { MenuGeneralComponent } from "./shared/menu-general/menu-general.component";
import { MenuClienteComponent } from "./shared/menu-cliente/menu-cliente.component";
import { RouterModule } from '@angular/router';
import { ClientePerfilComponent } from './perfiles/cliente-perfil/cliente-perfil.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { MenuDistribuidorComponent } from "./shared/menu-distribuidor/menu-distribuidor.component";
import { MenuAdminComponent } from "./shared/menu-admin/menu-admin.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteHomeComponent,
    DistribuidorHomeComponent,
    AdminHomeComponent,
    SolicitudDistribuidorComponent,
    AdminSolicitudesComponent,
    AdminParroquiasComponent,
    AdminBarriosComponent,
    AdminEstadoPedidosComponent,
    AdminEstadoSolicitudesComponent,
    AdminPresentacionesComponent,
    AdminProductosComponent,
    MmodalComponent,
    ClientePedidoComponent,
    AdminAbastecerComponent,
    DistribuidorPedidosComponent,
    ClientePedidosComponent,
    FacturasAllComponent,
    DetalleFacturaComponent,
    PagoConfirmadoComponent,
    // PagoConfirmadoComponent,
    MapaComponent,
    DistribuidorProfileComponent,
    AdminProfileComponent,
    ClientePerfilComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AuthModule,
    RouterModule,
    //NgbModule,
    ReactiveFormsModule,
    //ServiceWorkerModule.register('ngsw-worker.js', {
    //enabled: !isDevMode(),
    // Register the ServiceWorker as soon as the application is stable
    // or after 30 seconds (whichever comes first).
    // registrationStrategy: 'registerWhenStable:30000'
    //}),
    MenuGeneralComponent,
    MenuClienteComponent,
    FooterComponent,
    MenuDistribuidorComponent,
    MenuAdminComponent
  ],
  providers: [AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }