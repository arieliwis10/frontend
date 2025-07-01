import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente para recuperación de contraseña.
 * Permite validar el email y crear una nueva contraseña si el usuario existe.
 */
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  /** Email ingresado */
  email: string = '';
  /** Mensaje de feedback */
  mensaje: string = '';
  /** Nueva contraseña */
  nuevaContrasena: string = '';
  /** Confirmación de nueva contraseña */
  confirmarContrasena: string = '';
  /** Permite mostrar el formulario de cambio de contraseña */
  puedeCambiar: boolean = false;

  /**
   * Constructor. Inyecta servicios de autenticación y router.
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Valida el email y permite cambiar la contraseña si existe.
   */
  onSubmit() {
    if (!this.email) {
      this.mensaje = 'Por favor ingresa tu email.';
      this.puedeCambiar = false;
      return;
    }
    const usuarios = this.auth.getAllUsuarios ? this.auth.getAllUsuarios() : this.auth['getUsuarios']();
    const user = usuarios.find((u: any) => u.email === this.email);
    if (user) {
      this.mensaje = 'Email válido. Ahora puedes crear una nueva contraseña.';
      this.puedeCambiar = true;
    } else {
      this.mensaje = 'No existe una cuenta con ese email.';
      this.puedeCambiar = false;
    }
  }

  /**
   * Cambia la contraseña del usuario si los datos son válidos.
   */
  cambiarContrasena() {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      this.mensaje = 'Completa ambos campos de contraseña.';
      return;
    }
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.nuevaContrasena.length < 6) {
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    // Actualizar contraseña
    if (this.auth.updateUsuario) {
      this.auth.updateUsuario(this.email, { password: this.nuevaContrasena });
    } else {
      // fallback si no existe updateUsuario
      const usuarios = this.auth['getUsuarios']();
      const idx = usuarios.findIndex((u: any) => u.email === this.email);
      if (idx !== -1) {
        usuarios[idx].password = this.nuevaContrasena;
        this.auth['setUsuarios'](usuarios);
      }
    }
    this.mensaje = 'Contraseña actualizada correctamente. Redirigiendo a inicio de sesión...';
    this.puedeCambiar = false;
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1800);
  }
}
