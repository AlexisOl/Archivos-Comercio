import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistacomprasComponent } from './vistacompras.component';

describe('VistacomprasComponent', () => {
  let component: VistacomprasComponent;
  let fixture: ComponentFixture<VistacomprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistacomprasComponent]
    });
    fixture = TestBed.createComponent(VistacomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
