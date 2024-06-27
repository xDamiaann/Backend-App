import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudDistribuidorComponent } from './solicitud-distribuidor.component';

describe('SolicitudDistribuidorComponent', () => {
  let component: SolicitudDistribuidorComponent;
  let fixture: ComponentFixture<SolicitudDistribuidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudDistribuidorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudDistribuidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
