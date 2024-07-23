import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../../cliente/cliente-service.service'; // Cambiamos al servicio correcto
import { AdminServiceService } from 'src/app/admin/admin-service.service';
import { MmodalComponent } from 'src/app/shared/mmodal/mmodal.component';
import { ToastrService } from 'ngx-toastr';

interface Producto {
  id_producto: number;
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
  @ViewChild('distribuidoresCombinadosModal') distribuidoresCombinadosModal!: MmodalComponent;

  pedido = {
    ubicacion: '',
    detalles: [] as PedidoDetalle[]
  };

  ubicacion: string = '';
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
  pedidos: any[] = [];
  idCliente: string = '';

  distribuidoresCombinados: any[] = [];

  constructor(private clienteService: ClienteServiceService,
    private router: Router, private adminService: AdminServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const adminJson = localStorage.getItem('cliente');
    if (adminJson) {
      const cliente = JSON.parse(adminJson);
      this.idCliente = cliente ? cliente.id : '';
    }
    this.cargarProductos();
    this.obtenerUbicacionCliente();
    this.getIva();
  }

  cargarProductos() {
    this.adminService.cargarProductos().subscribe(
      data => {
        this.productos = data;
        this.productos.forEach(producto => {
          producto.id_producto = producto.id_producto;
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

  onPresentacionChange(event: any, producto: any) {
    const idPresentacion = +event.target.value;
    this.adminService.obtenerPresentacionesPorID(idPresentacion).subscribe(
      data => {
        producto.precioSeleccionado = data.precio;
        producto.presentacionSeleccionada = data;
        console.log("data", data); // Verifica que data.imagen no sea undefined
        if (data.imagen) {
          producto.imagenSeleccionada = `data:image/png;base64,${data.imagen}`;
        } else {
          producto.imagenSeleccionada = null; // Manejar el caso cuando la imagen no está presente
        }
        console.log(data.imagen);
      },
      error => console.error(error)
    );
  }

  agregarAlPedido(producto: any) {
    const presentacionSeleccionada = producto.presentacionSeleccionada;
    if (!presentacionSeleccionada) {
      return;
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
    console.log("pedido", this.pedido.detalles);
  }

  isProductoPresentacionEnPedido(producto: any, presentacion: any): boolean {
    return this.pedido.detalles.some(detalle =>
      detalle.producto === producto && detalle.presentacion.id_presentacion === presentacion.id_presentacion
    );
  }

  productoSeleccionado(producto: Producto): boolean {
    return this.pedido.detalles.some(detalle => detalle.producto === producto);
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

  validateNumber(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode !== 0 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  realizarPedido() {
    if (this.idCliente != '') {
      this.clienteService.getDistribuidoresConStock(this.pedido.detalles).subscribe(
        (distribuidores: any[]) => {
          if (distribuidores.length > 0) {
            this.distribuidores = distribuidores.filter(distribuidor => distribuidor.disponibilidad === 'Libre');
            console.log('normales', this.distribuidores);
            this.distribuidoresModal.abrir();
          } else {
            this.clienteService.getDistribuidoresCombinados(this.pedido.detalles).subscribe(
              (distribuidores: any[]) => {
                // this.distribuidoresCombinados = distribuidores;
                // this.distribuidoresCombinadosModal.distribuidores = distribuidores;
                // this.distribuidoresCombinadosModal.detalles = this.pedido.detalles;
                // console.log('combinados', this.distribuidoresCombinados);
                // this.distribuidoresCombinadosModal.abrir();

                this.toastr.info('No se encuentran distribuidores disponibles para tu pedido, intentalo mas tarde', 'Distribuidores no disponibles');
              },
              error => {
                console.error('Error al obtener distribuidores combinados:', error);
                this.toastr.info('No se encuentran distribuidores disponibles para tu pedido, intentalo mas tarde', 'Distribuidores no disponibles');
              }
            );
          }
        },
        error => {
          console.error('Error al obtener distribuidores:', error);
        }
      );
    }
  }

  onSelect(event: any) {
    console.log("ubicacion", this.ubicacion);
    const distribuidorSeleccionado = event;
    const pedidoFinal = {
      ...this.pedido,
      ubicacion: this.ubicacion,
      detalles: this.pedido.detalles.map(detalle => ({
        id_producto: detalle.producto.id_producto,
        id_presentacion: detalle.presentacion.id_presentacion,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        id_distribuidor: distribuidorSeleccionado.id_distribuidor
      })),
      id_cliente: this.idCliente,
      id_distribuidor: distribuidorSeleccionado.id_distribuidor
    };

    console.log("Pedido final que se enviará:", pedidoFinal);

    this.clienteService.realizarPedido(pedidoFinal).subscribe(
      () => {
        this.router.navigate(['/cliente-home']);
        window.location.reload();
      },
      error => {
        console.error('Error al realizar pedido:', error);
      }
    );
  }

  onSelect1(event: any) {
    this.router.navigate(['/cliente-home']);
    window.location.reload();
  }

  reasignarDistribuidor(pedido: any) {
    this.clienteService.reasignarDistribuidor(pedido.id_pedido, pedido.id_distribuidor).subscribe(
      (res) => {
        console.log("Distribuidor reasignado exitosamente", res);
        this.router.navigate(['/cliente-home']);
        window.location.reload();
      },
      (error) => {
        console.error('Error al reasignar distribuidor:', error);
      }
    );
  }

  obtenerUbicacionCliente() {
    this.clienteService.obtenerUbicacion().subscribe(
      (ubicacion: any) => {
        this.ubicacion = `${ubicacion.lat},${ubicacion.lng}`;
        console.log(this.ubicacion);
      },
      error => {
        console.error('Error al obtener la ubicación del cliente:', error);
      }
    );
  }

  getIva() {
    this.adminService.getIva().subscribe(
      (iva: any) => {

        console.log("iva", iva);
      },
      error => {
        console.error('Error al obtener la ubicación del cliente:', error);
      }
    );
  }
}
