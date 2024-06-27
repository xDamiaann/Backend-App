import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-solicitudes',
  templateUrl: './admin-solicitudes.component.html',
  styleUrls: ['./admin-solicitudes.component.css']
})
export class AdminSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  estadosSolicitud: any;
  resp: any;
  solicitud: any;
  estado: number=0;

  constructor(private http: HttpClient, private adminService:AdminServiceService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
    this.cargarEstadosSolicitud();
  }


  cargarSolicitudes() {
    this.adminService.cargarSolicitudes().subscribe(
      data => {
        // Asegurarte de que data es un array
        if (Array.isArray(data)) {
          this.solicitudes = data.filter(solicitud => solicitud.id_estadosolicitud === 1);
          console.log('Solicitudes cargadas:', this.solicitudes);
        } else {
          console.error('Los datos no son un array:', data);
        }
      },
      error => {
        console.error('Error al cargar solicitudes:', error);
      }
    );
    
  }

  cargarEstadosSolicitud() {
    this.adminService.cargarEstadosSolicitud().subscribe(
      data => {
        this.estadosSolicitud = data;
        //console.log(this.estadosSolicitud); // Puedes manejar los datos como necesites
        console.log('Estados de Solicitud:', this.estadosSolicitud); // Verifica que los datos se están cargando correctamente
      },
      error => {
        console.error('Error al obtener el estado de las solicitudes', error);
      }
    );
  
  }

  actualizarSolicitud(id: number) {
    console.log('Actualizando solicitud con id:', id);
    console.log('Estado a actualizar:', this.estado);

    this.adminService.actualizarSolicitud(id, this.estado).subscribe(
      data => {
        this.resp = data;
        console.log('Actualización:', this.resp);
        alert('Estado de solicitud actualizado.');
      },
      error => {
        console.error('Error al actualizar el estado', error);
      }
    );
  }

/*
  actualizarSolicitud(id: number) {
    console.log('Actualizando solicitud:', id); // Log para verificar la solicitud a actualizar
    this.adminService.actualizarSolicitud(id,this.estado).subscribe(
      data => {
        this.resp = data;
        console.log("actualizar",this.resp); // Puedes manejar los datos como necesites
      },
      error => {
        console.error('Error al actualizar el estado', error);
      }
    );   
   
  }
    */
  /*
  onEstadoSolicitudChange(event: any, solicitud: any): void {
    console.log('Evento change:', event); // Log para verificar el evento

    const target = event.target || event.srcElement || event.currentTarget;
    const newValue = target.value; // Obtener el valor del select

    console.log(`Nuevo valor: ${newValue}, Solicitud:`, solicitud); // Log para verificar los valores
    solicitud.id_estadosolicitud = newValue;
  }
    */

  onEstadoSolicitudChange(event: Event, solicitud: any): void {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value;
    console.log('Target:', target);
    console.log('New Value:', newValue);
    solicitud.id_estadosolicitud = parseInt(newValue, 10); // Asegúrate de convertir el valor a número
    this.estado = solicitud.id_estadosolicitud; // Asigna el nuevo valor a la variable estado
    console.log(`Nuevo valor: ${newValue}, Solicitud:`, solicitud); // Log para verificar los valores
  }

  enviarCorreo(solicitud: any) {
    // Lógica para enviar correo electrónico
  }
}
