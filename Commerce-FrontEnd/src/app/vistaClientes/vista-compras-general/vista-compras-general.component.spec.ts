import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaComprasGeneralComponent } from './vista-compras-general.component';

describe('VistaComprasGeneralComponent', () => {
  let component: VistaComprasGeneralComponent;
  let fixture: ComponentFixture<VistaComprasGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaComprasGeneralComponent]
    });
    fixture = TestBed.createComponent(VistaComprasGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
