import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstadoPedidosComponent } from './admin-estado-pedidos.component';

describe('AdminEstadoPedidosComponent', () => {
  let component: AdminEstadoPedidosComponent;
  let fixture: ComponentFixture<AdminEstadoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEstadoPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEstadoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
