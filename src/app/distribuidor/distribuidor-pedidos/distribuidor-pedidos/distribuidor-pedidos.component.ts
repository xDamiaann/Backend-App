import { Component, OnInit } from '@angular/core';
import { DistribuidorService } from '../../distribuidor-service.service';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';


@Component({
  selector: 'app-distribuidor-pedidos',
  templateUrl: './distribuidor-pedidos.component.html',
  styleUrls: ['./distribuidor-pedidos.component.css']
})
export class DistribuidorPedidosComponent implements OnInit {
  pedidospendientes: any[] = [];
  pedidosencamino: any[] = [];
  pedidosentregados: any[] = [];
  idDistribuidor: number = 0;

  constructor(
    private distribuidorService: DistribuidorService, private clienteService: ClienteServiceService
  ) { }

  ngOnInit(): void {
    const distribuidorJson = localStorage.getItem('cliente');
    if (distribuidorJson) {
      const distribuidor = JSON.parse(distribuidorJson);
      this.idDistribuidor = distribuidor ? distribuidor.id : '';
    }
    this.cargarPedidosPendientes();
    this.cargarPedidosEntregados();
    this.cargarPedidosEnCamino();
  }

  cargarPedidosPendientes() {
    this.distribuidorService.getPedidosPendientes(this.idDistribuidor).subscribe(
      data => {
        this.pedidospendientes = data;
        console.log(this.pedidospendientes);
      },
      error => {
        console.error('Error al cargar pedidos pendientes:', error);
      }
    );
  }

  cargarPedidosEnCamino() {
    this.distribuidorService.getPedidosEnCamino(this.idDistribuidor).subscribe(
      data => {
        this.pedidosencamino = data;
      },
      error => {
        console.error('Error al cargar pedidos en camino:', error);
      }
    );
  }

  cargarPedidosEntregados() {
    this.distribuidorService.getPedidosEntregados(this.idDistribuidor).subscribe(
      data => {
        this.pedidosentregados = data;
      },
      error => {
        console.error('Error al cargar pedidos entregados:', error);
      }
    );
  }

  actualizarEstadoPedido(id_pedido: number, estado: string) {
    const id_estadopedido = estado === 'Aceptar' ? 2 : (estado === 'Rechazar' ? 6 : 3); // 2: En Camino, 6: Rechazado, 3: Entregado
    this.distribuidorService.updateEstadoPedido(id_pedido, id_estadopedido).subscribe(
      () => {


        this.cargarPedidosPendientes(); // Recargar la lista de pedidos pendientes
        this.cargarPedidosEnCamino();
        this.cargarPedidosEntregados();

      },
      error => {
        console.error('Error al actualizar estado del pedido:', error);
      }
    );
  }

  finalizarPedido(pedido: any) {
    this.clienteService.updateEstadoPedido(pedido.id_pedido, 7).subscribe(() => { // 8: Finalizado
      //generar la factura
      this.distribuidorService.generarFactura(pedido.id_pedido, pedido).subscribe(() => {
        window.location.reload();
      });



    });
  }

}
