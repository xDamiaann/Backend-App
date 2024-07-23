
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(private router: Router, private elementRef: ElementRef) {}

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

  scrollToElement(elementId: string): void {
    const element = this.elementRef.nativeElement.querySelector('#' + elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToTerminos() {
    this.router.navigate(['terminos']);
  }

  navigateToNoticias() {
    this.router.navigate(['noticias']);
  }


  navigateToCaracteristicas() {
    this.router.navigate(['caracteristicas']);
  }
}
