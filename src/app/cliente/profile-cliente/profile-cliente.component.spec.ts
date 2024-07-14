import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClienteComponent } from './profile-cliente.component';

describe('ProfileClienteComponent', () => {
  let component: ProfileClienteComponent;
  let fixture: ComponentFixture<ProfileClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
