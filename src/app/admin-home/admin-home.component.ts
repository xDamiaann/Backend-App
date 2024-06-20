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
}
