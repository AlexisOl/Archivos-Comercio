import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCliComponent } from './header-cli.component';

describe('HeaderCliComponent', () => {
  let component: HeaderCliComponent;
  let fixture: ComponentFixture<HeaderCliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCliComponent]
    });
    fixture = TestBed.createComponent(HeaderCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
