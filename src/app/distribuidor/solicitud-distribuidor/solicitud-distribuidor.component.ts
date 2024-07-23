import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validaciones } from '../../../app/utils/validaciones';

@Component({
  selector: 'app-solicitud-distribuidor',
  templateUrl: './solicitud-distribuidor.component.html',
  styleUrls: ['./solicitud-distribuidor.component.css']
})
export class SolicitudDistribuidorComponent implements OnInit {

  solicitudForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  navigateToCliente() {
    this.router.navigate(['login-cliente']);
  }
  navigateToDistribuidor() {
    this.router.navigate(['login-distribuidor']);
  }
  navigateToAdmin() {
    this.router.navigate(['login-admin']);
  }

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      cedula: ['', [Validators.required, this.validarCedula.bind(this)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, this.validarTelefono.bind(this)]],
      email: ['', [Validators.required, this.validarCorreo.bind(this)]]
    });
  }

  validarCedula(control: any) {
    const valid = Validaciones.cedulaEcuatoriana(control.value);
    if (!valid) {
      return { invalidCedula: true };
    }
    return null;
  }

  validarCorreo(control: any) {
    const valid = Validaciones.correoValido(control.value);
    if (!valid) {
      return { invalidCorreo: true };
    }
    return null;
  }

  validarTelefono(control: any) {
    const valid = Validaciones.telefonoValido(control.value);
    if (!valid) {
      return { invalidTelefono: true };
    }
    return null;
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      const solicitudConFecha = {
        ...this.solicitudForm.value,
        id_admin: 1,
        id_estadosolicitud: 1,
        username: '',
        password: '',
        fechasolicitud: new Date().toISOString(),
        disponibilidad: 'Libre'
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
}
