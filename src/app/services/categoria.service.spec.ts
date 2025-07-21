import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CategoriaService } from './categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoriaService);
  });

  /**
   * Prueba 1: Debería crearse el servicio.
   */
  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });
});
