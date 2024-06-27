import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../../cliente/cliente-service.service'; // Cambiamos al servicio correcto
import { AdminServiceService } from 'src/app/admin/admin-service.service';
import { MmodalComponent } from 'src/app/shared/mmodal/mmodal.component';


interface Producto {
  nombre: string;
  presentacionNombre: string;
  precio: number;
  distribuidorNombre: string;
  stock: number;
}

interface PedidoDetalle {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './cliente-pedido.component.html',
  styleUrls: ['./cliente-pedido.component.css']
})
export class ClientePedidoComponent implements OnInit {

  @ViewChild('distribuidoresModal') distribuidoresModal!: MmodalComponent;
  productos: Producto[] = [];
  pedido = {
    ubicacion: '',
    detalles: [] as PedidoDetalle[]
  };

  idCliente: string='';
  distribuidores:any=[];

  constructor(private clienteService: ClienteServiceService, private router: Router,private adminService: AdminServiceService) {}

  ngOnInit(): void {
    const adminJson = localStorage.getItem('cliente');
    if (adminJson) {
      const cliente = JSON.parse(adminJson);
      this.idCliente = cliente ? cliente.id : '';
    }
    this.cargarProductos();
  }

  cargarProductos() {
    this.adminService.cargarProductos().subscribe(
      (data: Producto[]) => {
        // Filtrar productos únicos con el mayor stock
        const productosMap = new Map<string, Producto>();
        data.forEach((producto: Producto) => {
          const existingProducto = productosMap.get(producto.nombre);
          if (!existingProducto || producto.stock > existingProducto.stock) {
            productosMap.set(producto.nombre, producto);
          }
        });
        this.productos = Array.from(productosMap.values());
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  productoSeleccionado(producto: Producto): boolean {
    return this.pedido.detalles.some(detalle => detalle.producto === producto);
  }

  toggleProductoSeleccionado(producto: Producto, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      const detalleExistente = this.pedido.detalles.find(detalle => detalle.producto === producto);
      if (detalleExistente) {
        detalleExistente.cantidad += Math.min(detalleExistente.cantidad + 1, producto.stock);
      } else {
        this.pedido.detalles.push({ producto, cantidad: 1 });
      }
    } else {
      this.pedido.detalles = this.pedido.detalles.filter(detalle => detalle.producto !== producto);
    }
  }

  eliminarProducto(detalle: PedidoDetalle) {
    const index = this.pedido.detalles.indexOf(detalle);
    if (index > -1) {
      this.pedido.detalles.splice(index, 1);
    }
  }

  cambiarCantidad(detalle: PedidoDetalle, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const nuevaCantidad = parseInt(inputElement.value, 10);
    if (nuevaCantidad >= 1 && nuevaCantidad <= detalle.producto.stock) {
      detalle.cantidad = nuevaCantidad;
    }
  }

  realizarPedido() {
   
    
    if (this.idCliente!='') {  
      const pedidoConCliente = {
        ...this.pedido,
        id_cliente: this.idCliente
      };
      this.clienteService.getDistribuidoresDisponibles(pedidoConCliente).subscribe(
        (distribuidores: any[]) => {
          this.distribuidores = distribuidores;
          this.distribuidoresModal.abrir();  
        },
        error => {
          console.error('Error al obtener distribuidores:', error);
        }
      );
    }
  }

  onSelect(event: any) {
    const distribuidorSeleccionado = event; // Obtener el distribuidor seleccionado del evento
    const pedidoFinal = {
      ...this.pedido,
      distribuidor: distribuidorSeleccionado,
      id_cliente: this.idCliente
    };

    this.clienteService.realizarPedido(pedidoFinal).subscribe(
      () => {
        this.router.navigate(['/cliente-home']);
      },
      error => {
        console.error('Error al realizar pedido:', error);
      }
    );
  }
}
