import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClientesDineroGastadoComponent } from './reporte-clientes-dinero-gastado.component';

describe('ReporteClientesDineroGastadoComponent', () => {
  let component: ReporteClientesDineroGastadoComponent;
  let fixture: ComponentFixture<ReporteClientesDineroGastadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteClientesDineroGastadoComponent]
    });
    fixture = TestBed.createComponent(ReporteClientesDineroGastadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
