import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoTarjetasComponent } from './manejo-tarjetas.component';

describe('ManejoTarjetasComponent', () => {
  let component: ManejoTarjetasComponent;
  let fixture: ComponentFixture<ManejoTarjetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManejoTarjetasComponent]
    });
    fixture = TestBed.createComponent(ManejoTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
