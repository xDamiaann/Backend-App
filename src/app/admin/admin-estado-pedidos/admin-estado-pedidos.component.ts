import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-estado-pedidos',
  templateUrl: './admin-estado-pedidos.component.html',
  styleUrls: ['./admin-estado-pedidos.component.css']
})
export class AdminEstadoPedidosComponent implements OnInit {
  estadosPedidos: any[] = [];
  nuevoEstadoPedido = { nombre: '', descripcion: '' };

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.cargarEstadosPedidos();
  }

  cargarEstadosPedidos() {
    this.adminService.cargarEstadosPedidos().subscribe(
      data => {
        this.estadosPedidos = data;
      },
      error => {
        console.error('Error al cargar estados de pedidos:', error);
      }
    );
  }

  agregarEstadoPedido() {
    this.adminService.agregarEstadoPedido(this.nuevoEstadoPedido).subscribe(
      data => {
        this.estadosPedidos.push(data);
        this.nuevoEstadoPedido = { nombre: '', descripcion: '' };
        (document.getElementById('agregarEstadoPedidoModal') as HTMLElement).style.display = 'none';
        (document.querySelector('.modal-backdrop') as HTMLElement).remove();
      },
      error => {
        console.error('Error al agregar estado de pedido:', error);
      }
    );
  }

  eliminarEstadoPedido(id: number) {
    this.adminService.eliminarEstadoPedido(id).subscribe(
      () => {
        this.estadosPedidos = this.estadosPedidos.filter(e => e.id_estadopedido !== id);
      },
      error => {
        console.error('Error al eliminar estado de pedido:', error);
      }
    );
  }
}
