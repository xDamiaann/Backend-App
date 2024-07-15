import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

@Component({
  selector: 'app-menu-general',
  standalone: true,
  imports: [],
  templateUrl: './menu-general.component.html',
  styleUrl: './menu-general.component.css'
})
export class MenuGeneralComponent {

  constructor(private authService: AuthService, private router: Router, private ClienteService: ClienteServiceService) { }

  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navega a la ruta '/register'
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

}
