import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AuthService } from '../services/auth.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAllUsuarios', 'updateUsuario']);
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba 1: Debería crear el componente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios al inicializar', () => {
    authServiceSpy.getAllUsuarios.and.returnValue([{ email: 'test@mail.com' }]);
    component.cargarUsuarios();
    expect(component.usuarios.length).toBeGreaterThan(0);
  });
});
