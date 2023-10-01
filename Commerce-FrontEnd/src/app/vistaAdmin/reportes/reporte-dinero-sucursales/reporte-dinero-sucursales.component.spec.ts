import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDineroSucursalesComponent } from './reporte-dinero-sucursales.component';

describe('ReporteDineroSucursalesComponent', () => {
  let component: ReporteDineroSucursalesComponent;
  let fixture: ComponentFixture<ReporteDineroSucursalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteDineroSucursalesComponent]
    });
    fixture = TestBed.createComponent(ReporteDineroSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
