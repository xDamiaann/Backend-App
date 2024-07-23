import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.css'
})
export class TerminosComponent {

  constructor(private router: Router) {}

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
    this.router.navigate(['noticias']);
  }

  navigateToCaracteristicas() {
    this.router.navigate(['noticias']);
  }

  navigateToTerminos() {
    this.router.navigate(['terminos']);
  }

}
