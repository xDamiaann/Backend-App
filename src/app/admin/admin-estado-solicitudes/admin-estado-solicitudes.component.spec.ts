import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstadoSolicitudesComponent } from './admin-estado-solicitudes.component';

describe('AdminEstadoSolicitudesComponent', () => {
  let component: AdminEstadoSolicitudesComponent;
  let fixture: ComponentFixture<AdminEstadoSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEstadoSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEstadoSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
