import { TestBed } from '@angular/core/testing';

import { LoginIngresoService } from './login-ingreso.service';

describe('LoginIngresoService', () => {
  let service: LoginIngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginIngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
