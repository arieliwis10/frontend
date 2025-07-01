import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Componente de perfil de usuario.
 * Permite editar los datos personales del usuario logueado.
 */
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  /** Formulario reactivo de perfil */
  form: FormGroup;
  /** Mensaje de éxito */
  exito = '';
  /** Mensaje de error */
  error = '';
  /** Usuario actual */
  usuario: any = null;

  /**
   * Constructor. Inicializa el formulario y servicios.
   */
  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: [''],
      telefono: [''],
      direccion: [''],
      fechaNacimiento: [''],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: ['']
    });
  }

  /**
   * Inicializa el formulario con los datos del usuario logueado.
   */
  ngOnInit() {
    this.usuario = this.auth.getUsuario();
    if (this.usuario) {
      this.form.patchValue({
        nombre: this.usuario.nombre || '',
        apellido: this.usuario.apellido || '',
        telefono: this.usuario.telefono || '',
        direccion: this.usuario.direccion || '',
        fechaNacimiento: this.usuario.fechaNacimiento || '',
        email: this.usuario.email,
        password: this.usuario.password || ''
      });
    }
  }

  /**
   * Envía el formulario para actualizar los datos del usuario.
   */
  onSubmit() {
    if (this.form.valid && this.usuario) {
      const cambios = { ...this.form.getRawValue() };
      if (!cambios.password) delete cambios.password;
      this.auth.updateUsuario(this.usuario.email, cambios);
      this.exito = 'Datos actualizados correctamente';
      this.error = '';
    } else {
      this.error = 'Revisa los datos.';
      this.exito = '';
    }
  }
}
