import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBodegaComponent } from './header-bodega.component';

describe('HeaderBodegaComponent', () => {
  let component: HeaderBodegaComponent;
  let fixture: ComponentFixture<HeaderBodegaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderBodegaComponent]
    });
    fixture = TestBed.createComponent(HeaderBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
