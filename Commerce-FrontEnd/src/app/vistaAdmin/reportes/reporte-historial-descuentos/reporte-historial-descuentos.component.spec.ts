import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHistorialDescuentosComponent } from './reporte-historial-descuentos.component';

describe('ReporteHistorialDescuentosComponent', () => {
  let component: ReporteHistorialDescuentosComponent;
  let fixture: ComponentFixture<ReporteHistorialDescuentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteHistorialDescuentosComponent]
    });
    fixture = TestBed.createComponent(ReporteHistorialDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
