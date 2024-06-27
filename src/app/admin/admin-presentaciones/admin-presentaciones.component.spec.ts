import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresentacionesComponent } from './admin-presentaciones.component';

describe('AdminPresentacionesComponent', () => {
  let component: AdminPresentacionesComponent;
  let fixture: ComponentFixture<AdminPresentacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPresentacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPresentacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
