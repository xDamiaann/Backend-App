import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorProfileComponent } from './distribuidor-profile.component';

describe('DistribuidorProfileComponent', () => {
  let component: DistribuidorProfileComponent;
  let fixture: ComponentFixture<DistribuidorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribuidorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuidorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
