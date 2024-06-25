import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBarriosComponent } from './admin-barrios.component';

describe('AdminBarriosComponent', () => {
  let component: AdminBarriosComponent;
  let fixture: ComponentFixture<AdminBarriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBarriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
