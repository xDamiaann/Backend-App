import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-parroquias',
  templateUrl: './admin-parroquias.component.html',
  styleUrls: ['./admin-parroquias.component.css']
})
export class AdminParroquiasComponent implements OnInit {
  parroquias: any[] = [];
  nuevaParroquia = { id_admin: '', nombre: '', descripcion: '' };
  idAdmin: string = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {

    this.cargarParroquias();
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.idAdmin = admin ? admin.id : '';
    }
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

  agregarParroquia() {
    this.nuevaParroquia.id_admin = this.idAdmin;
    this.adminService.agregarParroquia(this.nuevaParroquia).subscribe(
      data => {
        this.parroquias.push(data);
        //this.nuevaParroquia.id_admin = this.idAdmin;
        this.nuevaParroquia.nombre = '';
        this.nuevaParroquia.descripcion = '';
        // Cerrar la ventana modal
        (document.getElementById('agregarParroquiaModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
      },
      error => {

        console.error('Error al agregar parroquia:', error);
      }
    );
  }

  eliminarParroquia(id: number) {
    this.adminService.eliminarParroquia(id).subscribe(
      () => {
        this.parroquias = this.parroquias.filter(p => p.id !== id);
      },
      error => {
        console.error('Error al eliminar parroquia:', error);
      }
    );
  }
}
