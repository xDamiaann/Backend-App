import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  username: string = ''; // Inicializar la propiedad
  constructor(private authService: AuthService, private router: Router, private ClienteService: ClienteServiceService) { }



  ngOnInit(): void {
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.username = admin ? admin.username : '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('distribuidor');
    this.router.navigate(['/']);
  }


  navigateToAdminHome() {
    this.router.navigate(['/admin-home']);
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

  navigateToAdminProfile() {
    this.router.navigate(['/admin-perfil']);
  }

}
