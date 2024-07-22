import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteServiceService } from '../cliente-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cliente-factura-detalle',
  templateUrl: './cliente-factura-detalle.component.html',
  styleUrls: ['./cliente-factura-detalle.component.css']
})
export class ClienteFacturaDetalleComponent implements OnInit {
  facturaId: string | null = null;
  factura: any;
  detalles: any[] = []; // Inicializar la propiedad detalles

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteServiceService
  ) { }

  ngOnInit(): void {
    this.facturaId = this.route.snapshot.paramMap.get('id');
    if (this.facturaId) {
      this.getFacturaDetalle(this.facturaId);
    }
  }

  getFacturaDetalle(id: string) {
    this.clienteService.getFacturaById(id).subscribe(
      (factura: any[]) => {
        if (factura.length > 0) {
          this.factura = factura[0];
          this.detalles = factura; // Asigna todos los detalles de la factura sin replicar la estructura infinita
        }
        console.log(this.factura);
      },
      error => {
        console.error('Error al obtener el detalle de la factura:', error);
      }
    );
  }

  downloadPDF() {
    const data = document.getElementById('invoice'); // Asegúrate de que el elemento tenga el ID correcto
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`Factura_${this.factura.numfactura}.pdf`);
      });
    }
  }
}
