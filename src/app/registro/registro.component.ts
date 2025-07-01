import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente de registro de usuario.
 * Permite crear una nueva cuenta con validaciones avanzadas.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  /** Formulario reactivo de registro */
  form: FormGroup;
  /** Mensaje de error */
  error: string = '';
  /** Mensaje de éxito */
  exito: string = '';

  /**
   * Constructor. Inicializa el formulario y servicios.
   */
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [this.minEdadValidator(13)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  /**
   * Validador personalizado para edad mínima.
   * @param minEdad Edad mínima requerida
   */
  minEdadValidator(minEdad: number) {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const hoy = new Date();
      const nacimiento = new Date(control.value);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad >= minEdad ? null : { minEdad: true };
    };
  }

  /**
   * Validador personalizado para coincidencia de contraseñas.
   * @param group FormGroup del formulario
   */
  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  /**
   * Envía el formulario de registro.
   */
  onSubmit() {
    if (this.form.valid) {
      if (this.auth.registrar(this.form.value)) {
        this.error = '';
        this.exito = '¡Registro exitoso! Redirigiendo...';
        setTimeout(() => this.router.navigate(['/']), 1500);
      } else {
        this.error = 'No se pudo registrar.';
        this.exito = '';
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * Resetea el formulario y limpia los mensajes de error y éxito.
   */
  onReset() {
    this.form.reset();
    this.error = '';
    this.exito = '';
  }
}
