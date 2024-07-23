import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'] // Corregido: styleUrl -> styleUrls
})
export class NoticiasComponent {
  currentDate: Date = new Date();

  constructor(private router: Router, private elementRef: ElementRef) { }

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
    this.router.navigate(['caracteristicas']);
  }

  navigateToTerminos() {
    this.router.navigate(['terminos']);
  }

  scrollToElement(elementId: string): void {
    const element = this.elementRef.nativeElement.querySelector('#' + elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

}