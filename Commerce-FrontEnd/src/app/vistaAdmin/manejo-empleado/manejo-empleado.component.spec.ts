import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoEmpleadoComponent } from './manejo-empleado.component';

describe('ManejoEmpleadoComponent', () => {
  let component: ManejoEmpleadoComponent;
  let fixture: ComponentFixture<ManejoEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManejoEmpleadoComponent]
    });
    fixture = TestBed.createComponent(ManejoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
