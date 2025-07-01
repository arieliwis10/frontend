import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  /**
   * Prueba 1: Debería crear el servicio.
   */
  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Prueba 2: Debería actualizar los datos de un usuario.
   */
  it('debería actualizar los datos de un usuario', () => {
    // Registrar usuario
    service.registrar({
      nombre: 'Test',
      apellido: 'User',
      email: 'test@correo.com',
      password: '1234',
      fechaNacimiento: '2000-01-01'
    });
    // Actualizar usuario
    service.updateUsuario('test@correo.com', { nombre: 'NuevoNombre' });
    const usuario = service.getAllUsuarios().find(u => u.email === 'test@correo.com');
    expect(usuario.nombre).toBe('NuevoNombre');
  });
});
