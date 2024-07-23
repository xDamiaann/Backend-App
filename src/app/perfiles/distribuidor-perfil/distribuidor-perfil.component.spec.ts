import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuidorPerfilComponent } from './distribuidor-perfil.component';

describe('DistribuidorPerfilComponent', () => {
  let component: DistribuidorPerfilComponent;
  let fixture: ComponentFixture<DistribuidorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribuidorPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribuidorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
