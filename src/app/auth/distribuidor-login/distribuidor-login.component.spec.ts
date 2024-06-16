import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorLoginComponent } from './distribuidor-login.component';

describe('DistribuidorLoginComponent', () => {
  let component: DistribuidorLoginComponent;
  let fixture: ComponentFixture<DistribuidorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribuidorLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuidorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
