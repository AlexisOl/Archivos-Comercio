import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCajeroComponent } from './general-cajero.component';

describe('GeneralCajeroComponent', () => {
  let component: GeneralCajeroComponent;
  let fixture: ComponentFixture<GeneralCajeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralCajeroComponent]
    });
    fixture = TestBed.createComponent(GeneralCajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
