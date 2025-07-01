import { TestBed } from '@angular/core/testing';

import { ServiciosService } from './servicios.service';

describe('ServiciosService', () => {
  let service: ServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosService);
  });

  /**
   * Prueba 1: Debería crearse el servicio.
   */
  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });
});
