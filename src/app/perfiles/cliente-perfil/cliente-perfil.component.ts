import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent implements OnInit {
  idCliente: any;
  cliente: any;
  barrios: any = [];
  isFormDisabled: boolean = true;  // Estado para habilitar/deshabilitar el formulario
  showPassword: boolean = false;  // Estado para mostrar/ocultar la contraseña

  constructor(private authService: AuthService, private ClienteService: ClienteServiceService, private router: Router, private toastr: ToastrService,) { }

  username: string = '';
  clienteForm!: FormGroup;

  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.username = cliente ? cliente.username : '';
      this.idCliente = cliente ? cliente.id : '';
      this.cargarDatosCliente();
      this.getBarrios();
    }
  }

  cargarDatosCliente() {
    this.ClienteService.getClienteId(this.idCliente).subscribe(
      data => {
        this.cliente = data;
        console.log("datos del cliente", this.cliente);
      },
      error => {
        console.error('Error al cargar las facturas:', error);
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

  getBarrios() {
    this.authService.getBarrios().subscribe(
      response => {
        this.barrios = response;
        console.log("datos", this.barrios);
      },
      error => {
        console.error('Error al obtener los barrios', error);
      }
    );
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
      this.authService.checkUsernameForUpdate(form.value.username, this.idCliente).subscribe(
        (isUsernameTaken) => {
          if (isUsernameTaken) {
            this.AlertaFail('El nombre de usuario ya está en uso por otro cliente');
          } else {
            const clienteData = { ...form.value, id_barrio: Number(form.value.barrio) };
            this.ClienteService.updateCliente(this.idCliente, clienteData).subscribe(
              response => {
                console.log('Respuesta del servidor:', response);
                this.isFormDisabled = true;
                this.AlertaSucess('Datos del cliente actualizados correctamente');
              },
              error => {
                console.error('Error al actualizar los datos del cliente:', error);
                this.AlertaFail('Error al actualizar los datos del cliente');
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
