import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba 1: Debería crear el componente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe marcar inválido si las contraseñas no coinciden', () => {
    component.form.setValue({
      nombre: 'Test',
      apellido: 'User',
      email: 'test@example.com',
      fechaNacimiento: '2003-01-01', // Fecha de nacimiento válida para mayor de 13 años
      password: 'Test1234',
      confirmPassword: 'Test4321'
    });
    expect(component.form.valid).toBeFalse();
    expect(component.form.errors?.['passwordsMismatch']).toBeTrue();
  });

  it('debe ser válido si todo está correcto', () => {
    component.form.setValue({
      nombre: 'Test',
      apellido: 'User',
      fechaNacimiento: '2003-01-01', // Fecha de nacimiento válida para mayor de 13 años
      email: 'test@example.com',
      password: 'Test1234',
      confirmPassword: 'Test1234'
    });
    expect(component.form.valid).toBeTrue();
  });
});
