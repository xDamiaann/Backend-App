import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

@Component({
  selector: 'app-menu-distribuidor',
  standalone: true,
  imports: [],
  templateUrl: './menu-distribuidor.component.html',
  styleUrl: './menu-distribuidor.component.css'
})
export class MenuDistribuidorComponent {

  username: string = ''; // Inicializar la propiedad
  constructor(private authService: AuthService, private router: Router, private ClienteService: ClienteServiceService) { }



  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('distribuidor');
    if (distribuidorJson) {
      const distribuidor = JSON.parse(distribuidorJson);
      this.username = distribuidor ? distribuidor.username : '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('distribuidor');
    this.router.navigate(['/']);
  }


  navigateToAdminHome() {
    this.router.navigate(['/distribuidor-home']);
  }


  navigateToPedidos() {
    this.router.navigate(['/distribuidor-pedidos']);
  }

  navigateToDsitribuidores() {
    this.router.navigate(['/admin-solicitudes']);
  }

  navigateToParroquias() {
    this.router.navigate(['/admin-parroquias']);
  }

  navigateToBarrios() {
    this.router.navigate(['/admin-barrios']);
  }

  navigateToEstadoPedidos() {
    this.router.navigate(['/admin-estado-pedidos']);
  }
  navigateToEstadoSolicitudes() {
    this.router.navigate(['/admin-estado-solicitudes']);
  }

  navigateToProductos() {
    this.router.navigate(['/admin-productos']);
  }

  navigateToPresentaciones() {
    this.router.navigate(['/admin-presentaciones']);
  }

  navigateToAbastecer() {
    this.router.navigate(['/admin-abastecer']);
  }



}
