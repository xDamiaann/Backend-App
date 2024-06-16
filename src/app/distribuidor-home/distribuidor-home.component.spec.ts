import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorHomeComponent } from './distribuidor-home.component';

describe('DistribuidorHomeComponent', () => {
  let component: DistribuidorHomeComponent;
  let fixture: ComponentFixture<DistribuidorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribuidorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuidorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
