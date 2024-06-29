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
  presentacion: any;
  cantidad: number;
  precio: number;
}

interface FormData {
  id_distribuidor: number | null;
  id_producto: number | null;
  id_productopresentacion: number | null;
  stock: number | null;
  precio: number | null;
}

@Component({
  selector: 'app-cliente-pedido',
  templateUrl: './cliente-pedido.component.html',
  styleUrls: ['./cliente-pedido.component.css']
})
export class ClientePedidoComponent implements OnInit {

  @ViewChild('distribuidoresModal') distribuidoresModal!: MmodalComponent;
  //productos: Producto[] = [];
  pedido = {
    ubicacion: '',
    detalles: [] as PedidoDetalle[]
  };

  formData: FormData = {
    id_distribuidor: null,
    id_producto: null,
    id_productopresentacion: null,
    stock: null,
    precio: null
  };


  productos: any[] = [];
  presentaciones: any[] = [];
  selectedProducto: number | null = null;
  selectedPresentacion: number | null = null;
  cantidad: number | null = null;
  carrito: any[] = [];
  distribuidores: any[] = [];
  precio: number | null = null;

  idCliente: string='';


  constructor(private clienteService: ClienteServiceService, private router: Router,private adminService: AdminServiceService) {}

  ngOnInit(): void {
    const adminJson = localStorage.getItem('cliente');
    if (adminJson) {
      const cliente = JSON.parse(adminJson);
      this.idCliente = cliente ? cliente.id : '';
    }
    this.cargarProductos();
  }

  // cargarProductos() {
  //   this.adminService.cargarProductos().subscribe(
  //     (data: Producto[]) => {
  //       // Filtrar productos únicos con el mayor stock
  //       const productosMap = new Map<string, Producto>();
  //       data.forEach((producto: Producto) => {
  //         const existingProducto = productosMap.get(producto.nombre);
  //         if (!existingProducto || producto.stock > existingProducto.stock) {
  //           productosMap.set(producto.nombre, producto);
  //         }
  //       });
  //       this.productos = Array.from(productosMap.values());
  //       console.log(this.productos);
  //     },
  //     error => {
  //       console.error('Error al cargar productos:', error);
  //     }
  //   );
  // }


  cargarProductos() {
    this.adminService.cargarProductos().subscribe(
      data => {
        this.productos = data;
        this.productos.forEach(producto => {
          this.adminService.obtenerPresentacionesPorProducto(producto.id_producto).subscribe(
            presentaciones => {
              producto.presentaciones = presentaciones;
            }
          );
        });
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }


  getPresentaciones(id:number) {
     
    
  }

  onPresentacionChange(event: any, producto: any) {
    const idPresentacion = +event.target.value;
    this.adminService.obtenerPresentacionesPorID(idPresentacion).subscribe(
      data => {
        producto.precioSeleccionado = data.precio;
        producto.presentacionSeleccionada = data; 
      },
      error => console.error(error)
    );
  }

  agregarAlPedido(producto: any) {
    const presentacionSeleccionada = producto.presentacionSeleccionada;
    if (!presentacionSeleccionada) {
      return; // No se puede agregar el producto sin una presentación seleccionada
    }
    const detalleExistente = this.pedido.detalles.find(detalle => 
      detalle.producto === producto && detalle.presentacion.id_presentacion === presentacionSeleccionada.id_presentacion
    );
    if (detalleExistente) {
      detalleExistente.cantidad += Math.min(detalleExistente.cantidad + 1, producto.stock);
    } else {
      this.pedido.detalles.push({
        producto,
        presentacion: presentacionSeleccionada,
        cantidad: 1,
        precio: producto.precioSeleccionado
      });
    }
  }

  productoSeleccionado(producto: Producto): boolean {
    return this.pedido.detalles.some(detalle => detalle.producto === producto);
  }

  toggleProductoSeleccionado(producto: any, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      const detalleExistente = this.pedido.detalles.find(detalle => detalle.producto === producto);
      if (detalleExistente) {
        detalleExistente.cantidad += Math.min(detalleExistente.cantidad + 1, producto.stock);
      } else {
        this.pedido.detalles.push({ 
          producto, 
          presentacion: producto.presentacionSeleccionada, 
          cantidad: 1, 
          precio: producto.precioSeleccionado 
        });
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
