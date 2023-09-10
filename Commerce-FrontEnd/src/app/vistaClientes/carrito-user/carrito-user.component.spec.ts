import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoUserComponent } from './carrito-user.component';

describe('CarritoUserComponent', () => {
  let component: CarritoUserComponent;
  let fixture: ComponentFixture<CarritoUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoUserComponent]
    });
    fixture = TestBed.createComponent(CarritoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
