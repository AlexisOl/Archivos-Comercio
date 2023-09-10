import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInventarioComponent } from './general-inventario.component';

describe('GeneralInventarioComponent', () => {
  let component: GeneralInventarioComponent;
  let fixture: ComponentFixture<GeneralInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInventarioComponent]
    });
    fixture = TestBed.createComponent(GeneralInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
