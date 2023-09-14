import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProdBodegaComponent } from './vista-prod-bodega.component';

describe('VistaProdBodegaComponent', () => {
  let component: VistaProdBodegaComponent;
  let fixture: ComponentFixture<VistaProdBodegaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaProdBodegaComponent]
    });
    fixture = TestBed.createComponent(VistaProdBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
