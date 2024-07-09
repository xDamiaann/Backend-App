import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ClienteServiceService } from '../../cliente-service.service'; // Cambiamos al servicio correcto
import { ActivatedRoute, Router } from '@angular/router';
import { MmodalComponent } from 'src/app/shared/mmodal/mmodal.component';
// import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-cliente-pedidos',
  templateUrl: './cliente-pedidos.component.html',
  styleUrls: ['./cliente-pedidos.component.css']
})
export class ClientePedidosComponent implements OnInit {
  pedidos: any[] = [];
  idCliente: string = '';
  distribuidores: any[] = [];
  pedidoSeleccionado: any;

  @ViewChild('distribuidoresModal') distribuidoresModal!: MmodalComponent;
  @ViewChild('pagoModal') pagoModal!: MmodalComponent;
  @ViewChild('pagoConfirmarModal') pagoConfirmarModal!: MmodalComponent;
  idPedido: any;
  orderId: any;
  status: any;
  IdPedido: any;
  pedido: any;
  valor: number = 0;



  constructor(private clienteService: ClienteServiceService, private router: Router, private renderer: Renderer2, private route: ActivatedRoute,

  ) { }

  total: any;
  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.idCliente = cliente ? cliente.id : '';
    }
    this.cargarPedidosCliente();

    this.route.queryParams.subscribe(params => {
      this.orderId = params['token']; // PayPal usa 'token' como nombre del parámetro para el orderId
      if (this.orderId) {
        // Llama al servicio para capturar la orden en PayPal
        this.clienteService.capturePayPalOrder(this.orderId).subscribe(
          (captureResponse: any) => {
            console.log("Respuesta del capture:", captureResponse);
            console.log("estado", captureResponse.status);
            this.status = captureResponse.status;
            if (this.status == 'COMPLETED') {
              this.pedido = localStorage.getItem('idPedido');
              this.clienteService.updateEstadoPedido(this.pedido, 8).subscribe(() => { // 8: Finalizado
                const msj = 'Tú pago se ha realizado con exito';
                this.valor = 1;
                this.pagoConfirmarModal.abrir();
              });

            }
            else {
              const msj = 'Tú pago no ha podido ser procesado';
              this.valor = 2;
              this.pagoConfirmarModal.abrir();
            }
          },
          error => {
            console.error('Error al capturar la orden de PayPal:', error);
            // Manejar el error según sea necesario
          }
        );
      }
    });
  }


  finalizarProceso() {
    window.location.reload();
  }

  // AlertaSucess(msj: string) {
  //   this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  // }

  // AlertaFail(msj: string) {
  //   this.toastr.error(msj, 'Error', { timeOut: 4000 });
  // }
  cargarPedidosCliente() {
    this.clienteService.getPedidosCliente(this.idCliente).subscribe(
      data => {
        this.pedidos = data;
        console.log(this.pedidos);
      },
      error => {
        console.error('Error al cargar los pedidos del cliente:', error);
      }
    );
  }

  reasignarDistribuidor(pedido: any) {
    this.pedidoSeleccionado = pedido;
    const detallesValidos = pedido.detalles.map((detalle: any) => ({
      id_detalle: detalle.id_detalle,
      id_producto: detalle.id_producto,
      id_presentacion: detalle.id_presentacion,
      cantidad: detalle.cantidad
    }));

    console.log('Detalles válidos para enviar:', detallesValidos);

    // Verificar que todos los detalles sean válidos antes de enviarlos
    for (const detalle of detallesValidos) {
      if (!detalle.id_presentacion || !detalle.id_producto || !detalle.cantidad) {
        console.error('Detalle inválido encontrado:', detalle);
        return;
      }
    }

    this.clienteService.getDistribuidoresConStockR(detallesValidos).subscribe(
      (distribuidores: any[]) => {
        this.distribuidores = distribuidores.filter(distribuidor => distribuidor.disponibilidad === 'Libre');
        this.distribuidoresModal.abrir();
      },
      error => {
        console.error('Error al obtener distribuidores:', error);
      }
    );
  }


  onSelect(event: any) {
    const distribuidorSeleccionado = event; // Obtener el distribuidor seleccionado del evento
    const pedidoFinal = {
      id_distribuidor: distribuidorSeleccionado.id_distribuidor,
      detalles: this.pedidoSeleccionado.detalles.map((detalle: any) => ({
        id_detalle: detalle.id_detalle,
        id_producto: detalle.id_producto,
        id_presentacion: detalle.id_presentacion,
        cantidad: detalle.cantidad
      }))
    };

    this.clienteService.updateDistribuidorPedido(this.pedidoSeleccionado.id_pedido, pedidoFinal).subscribe(
      () => {
        this.cargarPedidosCliente();
        window.location.reload();
        // Recargar la lista de pedidos del cliente
      },
      error => {
        console.error('Error al actualizar distribuidor del pedido:', error);
      }
    );
  }

  mostrarOpcionesPago(pedido: any) {
    this.pedidoSeleccionado = pedido;
    this.IdPedido = this.pedidoSeleccionado.id_pedido;
    localStorage.setItem('idPedido', JSON.stringify(this.IdPedido));
    console.log("pedido seleccionado", this.pedidoSeleccionado);
    this.pagoModal.abrir();
  }

  pagarPedido(metodo: any) {
    console.log("metodo de pago", metodo);
    console.log("id pedido", this.pedidoSeleccionado?.id_pedido);
    if (metodo == 1) {
      this.clienteService.updateEstadoPedido(this.pedidoSeleccionado.id_pedido, 8).subscribe(() => { // 8: Finalizado
        window.location.reload();
      });
    }

    if (metodo == 2) {

      const producto = {

        "intent": "CAPTURE",
        "purchase_units": [
          {
            "amount": {
              "currency_code": "USD",
              "value": "100.00"
            }
          }
        ]

      }

      this.clienteService.createPayPalOrder(producto).subscribe(
        (response: any) => {
          console.log(response);
          const url = response.approveLink;
          window.open(url, '_self');


        },
        error => {
          console.error('Error al procesar pago:', error);
        }
      );
    }

  }

  onSelectPago(event: any) {
    // Este método puede quedar vacío si no se requiere acción adicional
  }
}


