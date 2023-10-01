import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVentasGrandesComponent } from './reporte-ventas-grandes.component';

describe('ReporteVentasGrandesComponent', () => {
  let component: ReporteVentasGrandesComponent;
  let fixture: ComponentFixture<ReporteVentasGrandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteVentasGrandesComponent]
    });
    fixture = TestBed.createComponent(ReporteVentasGrandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
