import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInventarioComponent } from './header-inventario.component';

describe('HeaderInventarioComponent', () => {
  let component: HeaderInventarioComponent;
  let fixture: ComponentFixture<HeaderInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInventarioComponent]
    });
    fixture = TestBed.createComponent(HeaderInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
