import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecuperarComponent } from './recuperar.component';
import { AuthService } from '../services/auth.service';

/**
 * Pruebas unitarias para RecuperarComponent usando Jasmine y Karma.
 * @group RecuperarComponent
 */
describe('RecuperarComponent', () => {
  let component: RecuperarComponent;
  let fixture: ComponentFixture<RecuperarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAllUsuarios', 'updateUsuario']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [RecuperarComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    fixture = TestBed.createComponent(RecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba 1: Debe crear el componente correctamente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba 2: Debe mostrar mensaje de error si el email está vacío al enviar.
   */
  it('debería mostrar error si el email está vacío al enviar', () => {
    component.email = '';
    component.onSubmit();
    expect(component.mensaje).toContain('Por favor ingresa tu email');
    expect(component.puedeCambiar).toBeFalse();
  });

  /**
   * Prueba 3: Debe permitir cambiar contraseña si el email existe.
   */
  it('debería permitir cambiar contraseña si el email existe', () => {
    authServiceSpy.getAllUsuarios.and.returnValue([{ email: 'test@mail.com' }]);
    component.email = 'test@mail.com';
    component.onSubmit();
    expect(component.puedeCambiar).toBeTrue();
    expect(component.mensaje).toContain('Email válido');
  });

  /**
   * Prueba 4: Debe actualizar la contraseña y redirigir al login si todo es válido.
   */
  it('debería actualizar la contraseña y redirigir al login si todo es válido', () => {
    component.email = 'test@mail.com';
    component.nuevaContrasena = '123456';
    component.confirmarContrasena = '123456';
    component.puedeCambiar = true;
    authServiceSpy.updateUsuario.and.stub();
    component.cambiarContrasena();
    expect(authServiceSpy.updateUsuario).toHaveBeenCalledWith('test@mail.com', { password: '123456' });
    // El mensaje se muestra antes de la redirección
    expect(component.mensaje).toContain('Contraseña actualizada');
  });
});
