import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente de login de usuario.
 * Permite iniciar sesión con email y contraseña.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /** Formulario reactivo de login */
  form: FormGroup;
  /** Mensaje de error */
  error: string = '';

  /**
   * Constructor. Inicializa el formulario y servicios.
   */
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Envía el formulario de login.
   */
  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      if (this.auth.login(email, password)) {
        this.error = '';
        this.router.navigate(['/']);
      } else {
        this.error = 'Credenciales incorrectas';
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
