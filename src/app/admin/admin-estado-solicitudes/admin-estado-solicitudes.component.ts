import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-estado-solicitudes',
  templateUrl: './admin-estado-solicitudes.component.html',
  styleUrls: ['./admin-estado-solicitudes.component.css']
})
export class AdminEstadoSolicitudesComponent implements OnInit {
  estadosSolicitudes: any[] = [];
  nuevoEstadoSolicitud = { nombre: '', descripcion: '' };

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.cargarEstadosSolicitudes();
  }

  cargarEstadosSolicitudes() {
    this.adminService.cargarEstadosSolicitudes().subscribe(
      data => {
        this.estadosSolicitudes = data;
      },
      error => {
        console.error('Error al cargar estados de solicitudes:', error);
      }
    );
  }

  agregarEstadoSolicitud() {
    this.adminService.agregarEstadoSolicitud(this.nuevoEstadoSolicitud).subscribe(
      data => {
        this.estadosSolicitudes.push(data);
        this.nuevoEstadoSolicitud = { nombre: '', descripcion: '' };
        (document.getElementById('agregarEstadoSolicitudModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
      },
      error => {
        console.error('Error al agregar estado de solicitud:', error);
      }
    );
  }

  eliminarEstadoSolicitud(id: number) {
    this.adminService.eliminarEstadoSolicitud(id).subscribe(
      () => {
        this.estadosSolicitudes = this.estadosSolicitudes.filter(e => e.id_estadosolicitud !== id);
      },
      error => {
        console.error('Error al eliminar estado de solicitud:', error);
      }
    );
  }
}
