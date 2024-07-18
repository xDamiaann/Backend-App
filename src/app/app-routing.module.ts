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
import { SolicitudDistribuidorComponent } from './distribuidor/solicitud-distribuidor/solicitud-distribuidor.component';
import { AdminSolicitudesComponent } from './admin/admin-solicitudes/admin-solicitudes.component';
import { AdminParroquiasComponent } from './admin/admin-parroquias/admin-parroquias.component';
import { AdminBarriosComponent } from './admin/admin-barrios/admin-barrios.component';
import { AdminEstadoPedidosComponent } from './admin/admin-estado-pedidos/admin-estado-pedidos.component';
import { AdminEstadoSolicitudesComponent } from './admin/admin-estado-solicitudes/admin-estado-solicitudes.component';
import { AdminPresentacionesComponent } from './admin/admin-presentaciones/admin-presentaciones.component';
import { AdminProductosComponent } from './admin/admin-productos/admin-productos.component';
import { ClientePedidoComponent } from './cliente/cliente-pedido/cliente-pedido.component';
import { AdminAbastecerComponent } from './admin/admin-abastecer/admin-abastecer.component';
import { DistribuidorPedidosComponent } from './distribuidor/distribuidor-pedidos/distribuidor-pedidos/distribuidor-pedidos.component';
import { ClientePedidosComponent } from './cliente/cliente-pedidos/cliente-pedidos/cliente-pedidos.component';
import { FacturasAllComponent } from './facturacion/components/facturas-all/facturas-all.component';
import { Validaciones } from './utils/validaciones';
import { PagoConfirmadoComponent } from './facturacion/pago-confirmado/pago-confirmado.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactoComponent } from './contacto/contacto.component';
import { MapaComponent } from './distribuidor/mapa/mapa.component';
import { ClienteAuthGuard } from './utils/cliente-auth.guard';
import { AdminAuthGuard } from './utils/admin-auth.guard';
import { DistribuidorAuthGuard } from './utils/distribuidor-auth.guard';
import { DistribuidorProfileComponent } from './distribuidor/distribuidor-profile/distribuidor-profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ClientePerfilComponent } from './perfiles/cliente-perfil/cliente-perfil.component';
import { ClienteFacturasComponent } from './cliente/cliente-facturas/cliente-facturas.component';
import { NoticiasComponent } from './noticias/noticias.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-cliente', component: LoginComponent },
  { path: 'login-distribuidor', component: DistribuidorLoginComponent },
  { path: 'login-admin', component: AdminLoginComponent },
  { path: 'register-cliente', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'cliente-home', component: ClienteHomeComponent }, //ruta para la pagina de inicio del cliente
  { path: 'distribuidor-home', component: DistribuidorHomeComponent }, //ruta para la pagina de inicio del distribuidor
  { path: 'admin-home', component: AdminHomeComponent }, //ruta para la pagina de inicio del admin
  { path: 'solicitud-distribuidor', component: SolicitudDistribuidorComponent }, //ruta para la solicitud del distribuidor
  { path: 'admin-solicitudes', component: AdminSolicitudesComponent }, // ruta para admin solicitudes
  { path: 'admin-parroquias', component: AdminParroquiasComponent }, // ruta para la gestion de parroquias
  { path: 'admin-barrios', component: AdminBarriosComponent }, //ruta para la gestion de barrios 
  { path: 'admin-estado-pedidos', component: AdminEstadoPedidosComponent }, //ruta para la gestion de estado de pedidos
  { path: 'admin-estado-solicitudes', component: AdminEstadoSolicitudesComponent }, //ruta para la gestion de solicitudes
  { path: 'admin-presentaciones', component: AdminPresentacionesComponent }, //ruta para la gestion de presentaciones del producto
  { path: 'admin-productos', component: AdminProductosComponent }, //ruta para la gestion de productos
  { path: 'cliente-pedido', component: ClientePedidoComponent }, //ruta para la realizacion del pedido
  { path: 'admin-abastecer', component: AdminAbastecerComponent }, //ruta para abastecer a los distribuidores
  { path: 'distribuidor-pedidos', component: DistribuidorPedidosComponent },
  { path: 'cliente-pedidos', component: ClientePedidosComponent },
  { path: 'facturas', component: FacturasAllComponent },
  { path: 'validaciones', component: Validaciones },
  { path: 'pago-confirmado', component: PagoConfirmadoComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contacto', component: ContactoComponent },

  { path: 'mapa', component: MapaComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'distribuidor-profile', component: DistribuidorProfileComponent },
  { path: 'perfil', component: ClientePerfilComponent },
  { path: 'cliente-facturas', component: ClienteFacturasComponent },
  { path: 'noticias', component: NoticiasComponent },

  //{ path: '**', redirectTo: '' },// Manejo de rutas no encontradas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
