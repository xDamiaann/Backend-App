import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDistribuidorComponent } from './menu-distribuidor.component';

describe('MenuDistribuidorComponent', () => {
  let component: MenuDistribuidorComponent;
  let fixture: ComponentFixture<MenuDistribuidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDistribuidorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDistribuidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
