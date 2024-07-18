import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

// import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent implements OnInit {
  idCliente: any;
  cliente: any;
  barrios: any = [];
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
  onSubmit(form: any) {

    this.authService.registerClient(this.clienteForm.value).subscribe(
      response => {
        const msj = 'Cliente registrado correctamente';
        this.AlertaSucess(msj);
        setTimeout(() => {
          this.router.navigate(['/login-cliente']);
        }, 2000);

      },
      error => {
        console.error('Error al registrar el cliente', error);
      }
    );

  }

}


