import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';



@Component({
  selector: 'app-mmodal',
  templateUrl: './mmodal.component.html',
  styleUrls: ['./mmodal.component.css']
})
export class MmodalComponent implements OnInit {
  @Input() tipo = -1;
  @Input() idModal: string = '';
  @Input() title = '';
  @Input() icono: string = '';
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() total: any = 0;
  @Input() valor: any = 0;
  @Input() idpedido: any = 0;
  @Input() distribuidores: any[] = [];
  @Input() detalles: any[] = [];

  @Output() selectDistr: EventEmitter<any> = new EventEmitter();
  @Output() pagarPedido: EventEmitter<any> = new EventEmitter();
  @Output() finalizarProceso: EventEmitter<any> = new EventEmitter();

  @Output() confirmarCombinados: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalPublicar') modalPublicar!: ElementRef;
  @ViewChild('paypalButtons', { static: true, read: ElementRef }) paypalButtonsElement!: ElementRef<any>;

  detallesDistribuidores: any[] = [];

  message: string = '';
  api = '';
  val: number = 0;

  constructor(
  ) {
  }
  // async ngOnInit() {

  // }

  ngOnInit(): void {
    this.inicializarDetallesDistribuidores();
  }

  abrir() {
    console.log(this.distribuidores);
    this.modalPublicar.nativeElement.click();
  }

  cerrar() {
    this.modalPublicar.nativeElement.cerrar();
  }


  Selectdistribuidor(distribuidor: any) {
    this.selectDistr.emit(distribuidor);
  }

  MetodoPago(metodo: any) {

    this.val = metodo;
    if (metodo == 2) {
      this.pagarPedido.emit(metodo);
    }

    if (metodo == 1) {
      this.pagarPedido.emit(metodo);
    }

  }


  finalizar() {
    this.finalizarProceso.emit();
  }

  inicializarDetallesDistribuidores() {
    this.detallesDistribuidores = this.distribuidores.map(distribuidor =>
      this.detalles.map(detalle => ({
        distribuidor: distribuidor.id_distribuidor,
        producto: detalle.producto.id_producto,
        presentacion: detalle.presentacion.id_presentacion,
        cantidad: Math.min(detalle.cantidad, distribuidor.stock)
      }))
    );
  }

  onCantidadChange(detalle: any, distribuidor: any, nuevaCantidad: number) {
    const indexDistribuidor = this.distribuidores.findIndex(d => d.id_distribuidor === distribuidor.id_distribuidor);
    const indexDetalle = this.detalles.findIndex(d => d.producto.id_producto === detalle.producto.id_producto && d.presentacion.id_presentacion === detalle.presentacion.id_presentacion);
    this.detallesDistribuidores[indexDistribuidor][indexDetalle].cantidad = nuevaCantidad;
  }

  confirmarDistribuidoresCombinados() {
    this.confirmarCombinados.emit(this.detallesDistribuidores);
  }

}
