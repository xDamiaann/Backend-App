import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbastecerComponent } from './admin-abastecer.component';

describe('AdminAbastecerComponent', () => {
  let component: AdminAbastecerComponent;
  let fixture: ComponentFixture<AdminAbastecerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAbastecerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAbastecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
