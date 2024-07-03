import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasAllComponent } from './facturas-all.component';

describe('FacturasAllComponent', () => {
  let component: FacturasAllComponent;
  let fixture: ComponentFixture<FacturasAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
