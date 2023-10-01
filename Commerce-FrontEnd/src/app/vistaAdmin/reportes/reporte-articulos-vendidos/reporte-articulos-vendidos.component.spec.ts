import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteArticulosVendidosComponent } from './reporte-articulos-vendidos.component';

describe('ReporteArticulosVendidosComponent', () => {
  let component: ReporteArticulosVendidosComponent;
  let fixture: ComponentFixture<ReporteArticulosVendidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteArticulosVendidosComponent]
    });
    fixture = TestBed.createComponent(ReporteArticulosVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
