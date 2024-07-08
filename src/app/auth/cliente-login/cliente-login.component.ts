import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  token: any;
  cliente: any;

  constructor(private authService: AuthService, private router: Router) {}

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

  onSubmit() {
    this.authService.loginCliente(this.credentials).subscribe(
      response => {
        // Aquí manejas la respuesta del backend
        this.token = response.token;
        this.cliente=response.cliente;
        localStorage.setItem('token', this.token);
        localStorage.setItem('cliente', JSON.stringify(this.cliente));

        // Redirigir a la página de inicio del cliente
        this.router.navigate(['/cliente-home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}




  
