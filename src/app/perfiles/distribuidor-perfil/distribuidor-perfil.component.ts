import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DistribuidorService } from 'src/app/distribuidor/distribuidor-service.service';

@Component({
  selector: 'app-distribuidor-perfil',
  templateUrl: './distribuidor-perfil.component.html',
  styleUrls: ['./distribuidor-perfil.component.css']
})
export class DistribuidorPerfilComponent implements OnInit {
  idDistribuidor: any;
  distribuidor: any;
  isFormDisabled: boolean = true;  // Estado para habilitar/deshabilitar el formulario
  showPassword: boolean = false;  // Estado para mostrar/ocultar la contraseña

  constructor(private distribuidorService: DistribuidorService, private router: Router, private toastr: ToastrService) { }

  username: string = '';
  distribuidorForm!: FormGroup;

  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('distribuidor');
    if (distribuidorJson) {
      const distribuidor = JSON.parse(distribuidorJson);
      this.username = distribuidor ? distribuidor.username : '';
      this.idDistribuidor = distribuidor ? distribuidor.id : '';
      this.cargarDatosDistribuidor();
    }
  }

  cargarDatosDistribuidor() {
    this.distribuidorService.getDistribuidorInfo(this.idDistribuidor).subscribe(
      data => {
        this.distribuidor = data;
        console.log("datos del distribuidor", this.distribuidor);
      },
      error => {
        console.error('Error al cargar los datos del distribuidor:', error);
      }
    );
  }

  AlertaSucess(msj: string) {
    console.log("alerta", msj);
    this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  }

  AlertaFail(msj: string) {
    this.toastr.error(msj, 'Error', { timeOut: 4000 });
  }

  enableForm() {
    this.isFormDisabled = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get passwordFieldType() {
    return this.showPassword ? 'text' : 'password';
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.distribuidorService.checkUsernameForUpdate(form.value.username, this.idDistribuidor).subscribe(
        (isUsernameTaken) => {
          if (isUsernameTaken) {
            this.AlertaFail('El nombre de usuario ya está en uso por otro distribuidor');
          } else {
            const distribuidorData = { ...form.value, id_distribuidor: this.idDistribuidor };
            this.distribuidorService.updateDistribuidor(this.idDistribuidor, distribuidorData).subscribe(
              response => {
                console.log('Respuesta del servidor:', response);
                this.isFormDisabled = true;
                this.AlertaSucess('Datos del distribuidor actualizados correctamente');
              },
              error => {
                console.error('Error al actualizar los datos del distribuidor:', error);
                this.AlertaFail('Error al actualizar los datos del distribuidor');
              }
            );
          }
        },
        error => {
          console.error('Error al verificar el nombre de usuario:', error);
          this.AlertaFail('Error al verificar el nombre de usuario');
        }
      );
    }
  }
}
