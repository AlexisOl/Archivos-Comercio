import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionBodegaComponent } from './devolucion-bodega.component';

describe('DevolucionBodegaComponent', () => {
  let component: DevolucionBodegaComponent;
  let fixture: ComponentFixture<DevolucionBodegaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevolucionBodegaComponent]
    });
    fixture = TestBed.createComponent(DevolucionBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
