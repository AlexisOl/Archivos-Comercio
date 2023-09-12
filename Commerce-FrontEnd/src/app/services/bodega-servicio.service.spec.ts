import { TestBed } from '@angular/core/testing';

import { BodegaServicioService } from './bodega-servicio.service';

describe('BodegaServicioService', () => {
  let service: BodegaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodegaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
