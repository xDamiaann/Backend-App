import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  username: string = ''; // Inicializar la propiedad


  constructor(private router: Router) {}

  //obtener username para presentarlo
  ngOnInit(): void {
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.username = admin ? admin.username : '';
    }
  }

  //cerrar sesion
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/']);
  }

  //navegar por solicitudes
  navigateToSolicitudes() {
    this.router.navigate(['/admin-solicitudes']);
  }

  //navegar por parroquias
  navigateToParroquias() {
    this.router.navigate(['/admin-parroquias']);
  }

  //navegar por barrios
  navigateToBarrios() {
    this.router.navigate(['/admin-barrios']);
  }

  //navegar por estado pedido
  navigateToEstadoPedidos() {
    this.router.navigate(['/admin-estado-pedidos']);
  }

  //navegar por estados solicitudes
  navigateToEstadoSolicitudes() {
    this.router.navigate(['/admin-estado-solicitudes']);
  }

  //navegar por productos
  navigateToProductos() {
    this.router.navigate(['/admin-productos']);
  }

  //navegar por presentaciones de productos
  navigateToPresentaciones() {
    this.router.navigate(['/admin-presentaciones']);
  }

  navigateToAbastecerDistribuidores(){
    this.router.navigate(['/admin-abastecer']);
  }
}
