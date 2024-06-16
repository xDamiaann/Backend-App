import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-distribuidor-login',
  templateUrl: './distribuidor-login.component.html',
  styleUrls: ['./distribuidor-login.component.css']
})
export class DistribuidorLoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  token: any;
  distribuidor: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.loginDistribuidor(this.credentials).subscribe(
      response => {
        // Aquí manejas la respuesta del backend
        this.token = response.token;
        this.distribuidor=response.distribuidor;
        localStorage.setItem('token', this.token);
        localStorage.setItem('distribuidor', JSON.stringify(this.distribuidor));

        // Redirigir a la página de inicio del cliente
        this.router.navigate(['/distribuidor-home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
