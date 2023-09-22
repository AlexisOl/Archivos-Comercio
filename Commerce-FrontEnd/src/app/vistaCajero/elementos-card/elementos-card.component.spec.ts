import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementosCardComponent } from './elementos-card.component';

describe('ElementosCardComponent', () => {
  let component: ElementosCardComponent;
  let fixture: ComponentFixture<ElementosCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementosCardComponent]
    });
    fixture = TestBed.createComponent(ElementosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
