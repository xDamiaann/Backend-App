import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFacturaDetalleComponent } from './cliente-factura-detalle.component';

describe('ClienteFacturaDetalleComponent', () => {
  let component: ClienteFacturaDetalleComponent;
  let fixture: ComponentFixture<ClienteFacturaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteFacturaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteFacturaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
