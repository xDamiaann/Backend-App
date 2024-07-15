import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  token: any;
  admin: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin-home']);
    }
  }

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


  onSubmit() {
    this.authService.loginAdmin(this.credentials).subscribe(
      response => {
        // Aquí manejas la respuesta del backend
        this.token = response.token;
        this.admin = response.admin;
        localStorage.setItem('token', this.token);
        localStorage.setItem('admin', JSON.stringify(this.admin));

        // Redirigir a la página de inicio del cliente
        this.router.navigate(['/admin-home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
