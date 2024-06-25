import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParroquiasComponent } from './admin-parroquias.component';

describe('AdminParroquiasComponent', () => {
  let component: AdminParroquiasComponent;
  let fixture: ComponentFixture<AdminParroquiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParroquiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminParroquiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
