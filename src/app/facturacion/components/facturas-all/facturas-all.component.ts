import { Component } from '@angular/core';
import { FacturaServiceService } from '../../factura.service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-facturas-all',
  templateUrl: './facturas-all.component.html',
  styleUrls: ['./facturas-all.component.css']
})
export class FacturasAllComponent {
  idCliente: any;
  facturas: any;
  constructor(private facturaService: FacturaServiceService, private router: Router) { }


  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.idCliente = cliente ? cliente.id : '';
    }
    this.cargarPedidosCliente();
  }

  cargarPedidosCliente() {
    this.facturaService.getAllFacturas().subscribe(
      data => {
        this.facturas = data;
        console.log(this.facturas);
      },
      error => {
        console.error('Error al cargar las facturas:', error);
      }
    );
  }

  Detalle(id: number) {

  }
}
