import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBodegaComponent } from './general-bodega.component';

describe('GeneralBodegaComponent', () => {
  let component: GeneralBodegaComponent;
  let fixture: ComponentFixture<GeneralBodegaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralBodegaComponent]
    });
    fixture = TestBed.createComponent(GeneralBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
