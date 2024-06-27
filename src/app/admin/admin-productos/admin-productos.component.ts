import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: any[] = [];
  presentaciones: any[] = [];
  distribuidores:any[] = [];
  nuevoProducto = { id_admin: '', id_presentacion: '', id_distribuidor: '',nombre: '', descripcion: '', stock: 0 };

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarPresentaciones();
    this.cargarDistribuidores();
    const adminJson = localStorage.getItem('admin');
    if (adminJson) {
      const admin = JSON.parse(adminJson);
      this.nuevoProducto.id_admin = admin ? admin.id : '';
    }
  }

  cargarProductos() {
    this.adminService.cargarProductos().subscribe(
      data => {
        this.productos = data;
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
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

  cargarDistribuidores() {
    this.adminService.cargarDistribuidores().subscribe(
      data => {
        this.distribuidores = data;
      },
      error => {
        console.error('Error al cargar distribuidores:', error);
      }
    );
  }

  agregarProducto() {
    this.adminService.agregarProducto(this.nuevoProducto).subscribe(
      data => {
        this.productos.push(data);
        this.nuevoProducto = { id_admin: '', id_presentacion: '', id_distribuidor: '', nombre: '', descripcion: '', stock: 0 };
        (document.getElementById('agregarProductoModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
        window.location.reload();
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  eliminarProducto(id: number) {
    this.adminService.eliminarProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter(p => p.id_producto !== id);
      },
      error => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }
}
