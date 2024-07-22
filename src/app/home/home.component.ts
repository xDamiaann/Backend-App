
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WOW } from 'wowjs';
import { AdminServiceService } from '../admin/admin-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})

export class HomeComponent {
  productos: any[] = [];
  presentaciones: any[] = [];
  constructor(private router: Router, private adminService: AdminServiceService) { }

  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  navigateToAbout() {
    this.router.navigate(['about']);
  }

  navigateToShop() {
    this.router.navigate(['shop']);
  }

  navigateToContacto() {
    this.router.navigate(['contacto']);
  }

  navigateToNoticias() {
    this.router.navigate(['noticias'])
  }

  ngOnInit() {
    //new WOW().init();
    this.cargarProductos();
  }


  navigateToNoticias() {
    this.router.navigate(['noticias']);
  }
  navigateToCaracteristicas() {
    this.router.navigate(['noticias']);
  }


  currentDate: Date = new Date();


  cargarProductos() {
    this.adminService.getAllProductosPresentaciones().subscribe(
      data => {
        this.productos = data;
        console.log("productos", this.productos);
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }


}

