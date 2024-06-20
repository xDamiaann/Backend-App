import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitud-distribuidor',
  templateUrl: './solicitud-distribuidor.component.html',
  styleUrls: ['./solicitud-distribuidor.component.css']
})
export class SolicitudDistribuidorComponent {
  solicitud = {
    cedula: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const solicitudConFecha = {
      ...this.solicitud,
      id_admin: 5,
      id_estadosolicitud: 1,
      username: '',
      password: '',
      fechasolicitud: new Date().toISOString()
    };

    this.http.post('http://localhost:3000/api/distribuidor', solicitudConFecha).subscribe(
      response => {
        alert('Solicitud enviada. Se le notificará por correo electrónico.');
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un error al enviar la solicitud. Por favor, inténtelo de nuevo.');
      }
    );
  }
}
