import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosSucursalComponent } from './ver-productos-sucursal.component';

describe('VerProductosSucursalComponent', () => {
  let component: VerProductosSucursalComponent;
  let fixture: ComponentFixture<VerProductosSucursalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerProductosSucursalComponent]
    });
    fixture = TestBed.createComponent(VerProductosSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
