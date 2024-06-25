import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-barrios',
  templateUrl: './admin-barrios.component.html',
  styleUrls: ['./admin-barrios.component.css']
})
export class AdminBarriosComponent implements OnInit {
  barrios: any[] = [];
  parroquias: any[] = [];
  nuevoBarrio = { id_admin:'', id_parroquia: '', nombre: '', ubicacion: '', descripcion: '' };
  idAdmin: string = '';

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.cargarBarrios();
    this.cargarParroquias();
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.idAdmin = admin ? admin.id : '';
    }
  }

  cargarBarrios() {
    this.adminService.cargarBarrios().subscribe(
      data => {
        this.barrios = data;
      },
      error => {
        console.error('Error al cargar barrios:', error);
      }
    );
  }

  cargarParroquias() {
    this.adminService.cargarParroquias().subscribe(
      data => {
        this.parroquias = data;
      },
      error => {
        console.error('Error al cargar parroquias:', error);
      }
    );
  }

  agregarBarrio() {
    this.nuevoBarrio.id_admin = this.idAdmin;
    this.adminService.agregarBarrio(this.nuevoBarrio).subscribe(
      data => {
        this.barrios.push(data);
        this.nuevoBarrio = { id_admin: '', id_parroquia: '', nombre: '', ubicacion: '', descripcion: '' };
        // Cerrar la ventana modal
        (document.getElementById('agregarBarrioModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
      },
      error => {
        console.error('Error al agregar barrio:', error);
      }
    );
  }

  eliminarBarrio(id: number) {
    this.adminService.eliminarBarrio(id).subscribe(
      () => {
        this.barrios = this.barrios.filter(b => b.id_barrio !== id);
      },
      error => {
        console.error('Error al eliminar barrio:', error);
      }
    );
  }
}
