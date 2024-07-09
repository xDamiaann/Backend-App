import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

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

  constructor(private authService: AuthService, private router: Router, private ClienteService: ClienteServiceService) { }

  onSubmit() {
    this.authService.loginCliente(this.credentials).subscribe(
      response => {
        // Aquí manejas la respuesta del backend
        this.token = response.token;
        this.cliente = response.cliente;
        localStorage.setItem('token', this.token);
        localStorage.setItem('cliente', JSON.stringify(this.cliente));

        //this.obtenerUbicacionCliente();

        // Redirigir a la página de inicio del cliente
        this.router.navigate(['/cliente-home']);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

  // obtenerUbicacionCliente() {
  //   this.ClienteService.obtenerUbicacion().subscribe(
  //     (ubicacion: any) => {
  //       console.log('Ubicación del cliente:', ubicacion);
  //       // Aquí puedes manejar la ubicación del cliente, como enviarla al backend si es necesario
  //       // Por ejemplo:
  //       // this.clienteService.actualizarUbicacion(ubicacion).subscribe(
  //       //   () => {
  //       //     console.log('Ubicación del cliente actualizada correctamente.');
  //       //   },
  //       //   error => {
  //       //     console.error('Error al actualizar la ubicación del cliente:', error);
  //       //   }
  //       // );
  //     },
  //     error => {
  //       console.error('Error al obtener la ubicación del cliente:', error);
  //     }
  //   );
  // }
}
