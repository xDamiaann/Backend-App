import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProfileComponent } from './cliente-profile.component';

describe('ClienteProfileComponent', () => {
  let component: ClienteProfileComponent;
  let fixture: ComponentFixture<ClienteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
