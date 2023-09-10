import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { utilsGuard } from './utils.guard';

describe('utilsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => utilsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
