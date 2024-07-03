import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../cliente/cliente-service.service';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {
  username: string = ''; //Inicializar la propiedad
  pedidos: any[] = [];
  idCliente: string = '';
  distribuidores: any = [];

  constructor(private router: Router, private clienteService: ClienteServiceService) { }

  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.username = cliente ? cliente.username : '';
      this.idCliente = cliente ? cliente.id : '';
      this.cargarPedidosCliente();
    }
  }

  cargarPedidosCliente() {
    this.clienteService.getPedidosCliente(this.idCliente).subscribe(
      data => {
        this.pedidos = data;
        console.log(this.pedidos);
      },
      error => {
        console.error('Error al cargar pedidos del cliente:', error);
      }
    );
  }

  seleccionarOtroDistribuidor(pedido: any) {
    console.log("pedidio html", pedido)
    this.clienteService.getDistribuidoresConStock(pedido).subscribe(
      data => {
        this.distribuidores = data;
        console.log("distribuidores", this.distribuidores);
      },
      error => {
        console.error('Error al obtener distribuidores:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    this.router.navigate(['/']);
  }

  //navegar por pedidos
  navigateToPedido() {
    this.router.navigate(['/cliente-pedido']);
  }
}
