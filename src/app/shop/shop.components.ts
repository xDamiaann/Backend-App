
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './shop.components.html',
  styleUrls: ['./shop.components.css']
})

export class ShopComponent {

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
}
