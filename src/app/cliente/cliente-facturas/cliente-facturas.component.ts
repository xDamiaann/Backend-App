import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../cliente-service.service';
import { MenuClienteComponent } from "../../shared/menu-cliente/menu-cliente.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-cliente-facturas',
  templateUrl: './cliente-facturas.component.html',
  styleUrl: './cliente-facturas.component.css'
})
export class ClienteFacturasComponent {
  username: any;
  idCliente: any;
  facturas: any;

  constructor(private clienteService: ClienteServiceService, private router: Router) {

  }
  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.username = cliente ? cliente.username : '';
      this.idCliente = cliente ? cliente.id : '';
      this.getFacturas();
    }
  }

  getFacturas() {
    this.clienteService.getFacturasByClienteId(this.idCliente).subscribe(
      (factura: any[]) => {
        this.facturas = factura;
        console.log(this.facturas);
      },
      error => {
        console.error('Error al obtener distribuidores:', error);
      }
    );
  }

  detalleFactura(id: string) {
    this.router.navigate(['factura-detalle', id]);
  }
}
