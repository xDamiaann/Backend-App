import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  };
  token: any;
  cliente: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ClienteService: ClienteServiceService,
    private toastr: ToastrService
  ) { }

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
    this.router.navigate(['/register-cliente']);
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

  navigateToRecoverAccount() {
    this.router.navigate(['/recover-account']);
  }

  ngOnInit(): void {
    if (this.authService.isClienteLoggedIn()) {
      this.router.navigate(['/cliente-home']);
    }
  }

  onSubmit() {
    this.authService.loginCliente(this.credentials).subscribe(
      response => {
        // Inicio de sesión exitoso
        this.token = response.token;
        this.cliente = response.cliente;
        localStorage.setItem('token', this.token);
        localStorage.setItem('cliente', JSON.stringify(this.cliente));

        this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
        this.router.navigate(['/cliente-home']);
      },
      error => {
        // Manejar errores de inicio de sesión
        if (error.status === 404) {
          this.toastr.error('Usuario no encontrado', 'Error');
        } else if (error.status === 401) {
          this.toastr.error('Usuario o Contraseña incorrecta', 'Error');
        } else {
          this.toastr.error('Error al iniciar sesión', 'Error');
        }
      }
    );
  }

  navigateToClienteRegister() {
    this.router.navigate(['register-cliente']);
  }
}
