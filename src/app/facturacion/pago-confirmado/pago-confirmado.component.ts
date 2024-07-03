import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteServiceService } from 'src/app/cliente/cliente-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-confirmado',
  templateUrl: './pago-confirmado.component.html',
  styleUrls: ['./pago-confirmado.component.css']
})
export class PagoConfirmadoComponent {
  orderId: any;

  constructor(private clienteService: ClienteServiceService, private router: Router, private renderer: Renderer2, private route: ActivatedRoute,) { }

  total: any;
  status: string = '';
  ngOnInit(): void {
    // Obtén el orderId desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.orderId = params['token']; // PayPal usa 'token' como nombre del parámetro para el orderId
      if (this.orderId) {
        // Llama al servicio para capturar la orden en PayPal
        this.clienteService.capturePayPalOrder(this.orderId).subscribe(
          (captureResponse: any) => {
            console.log("Respuesta del capture:", captureResponse);
            console.log("estado", captureResponse.status);
            this.status = captureResponse.status;
          },
          error => {
            console.error('Error al capturar la orden de PayPal:', error);
            // Manejar el error según sea necesario
          }
        );
      }
    });
  }
}



