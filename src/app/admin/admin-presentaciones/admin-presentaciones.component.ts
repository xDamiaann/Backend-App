import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-presentaciones',
  templateUrl: './admin-presentaciones.component.html',
  styleUrls: ['./admin-presentaciones.component.css']
})
export class AdminPresentacionesComponent implements OnInit {
  presentaciones: any[] = [];
  nuevaPresentacion = { nombre: '', descripcion: '', precio: 0 };

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.cargarPresentaciones();
  }

  cargarPresentaciones() {
    this.adminService.cargarPresentaciones().subscribe(
      data => {
        this.presentaciones = data;
      },
      error => {
        console.error('Error al cargar presentaciones:', error);
      }
    );
  }

  agregarPresentacion() {
    this.adminService.agregarPresentacion(this.nuevaPresentacion).subscribe(
      data => {
        this.presentaciones.push(data);
        this.nuevaPresentacion = { nombre: '', descripcion: '', precio: 0 };
        (document.getElementById('agregarPresentacionModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
      },
      error => {
        console.error('Error al agregar presentacion:', error);
      }
    );
  }

  eliminarPresentacion(id: number) {
    this.adminService.eliminarPresentacion(id).subscribe(
      () => {
        this.presentaciones = this.presentaciones.filter(p => p.id_presentacion !== id);
      },
      error => {
        console.error('Error al eliminar presentacion:', error);
      }
    );
  }
}
