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

  @Output() selectDistr: EventEmitter<any> = new EventEmitter();
  @Output() pagarPedido: EventEmitter<any> = new EventEmitter();
  @Output() finalizarProceso: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalPublicar') modalPublicar!: ElementRef;
  @ViewChild('paypalButtons', { static: true, read: ElementRef }) paypalButtonsElement!: ElementRef<any>;



  message: string = '';
  api = '';
  val: number = 0;

  constructor(
  ) {
  }
  // async ngOnInit() {

  // }

  ngOnInit(): void {

  }

  abrir() {
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



}
