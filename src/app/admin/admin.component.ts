import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

/**
 * Componente para administración de usuarios.
 * Permite ver, editar y guardar usuarios desde el panel admin.
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: false
})
export class AdminComponent implements OnInit {
  /** Lista de usuarios */
  usuarios: any[] = [];
  /** Email del usuario en edición */
  editando: string | null = null;
  /** Datos temporales del usuario en edición */
  editData: any = {};

  /**
   * Constructor. Inyecta el servicio de autenticación.
   */
  constructor(private auth: AuthService) {}

  /**
   * Inicializa el componente y carga los usuarios.
   */
  ngOnInit() {
    this.cargarUsuarios();
  }

  /**
   * Carga todos los usuarios del sistema.
   */
  cargarUsuarios() {
    this.usuarios = this.auth.getAllUsuarios();
  }

  /**
   * Activa el modo edición para un usuario.
   * @param email Email del usuario a editar
   */
  editar(email: string) {
    this.editando = email;
    const user = this.usuarios.find(u => u.email === email);
    this.editData = { ...user };
  }

  /**
   * Guarda los cambios del usuario editado.
   * @param email Email del usuario a guardar
   */
  guardar(email: string) {
    this.auth.updateUsuario(email, this.editData);
    this.editando = null;
    this.cargarUsuarios();
  }

  /**
   * Cancela la edición de usuario.
   */
  cancelar() {
    this.editando = null;
    this.editData = {};
  }

  /**
   * Elimina un usuario y actualiza la lista.
   * @param email Email del usuario a eliminar
   */
  eliminarUsuario(email: string) {
    this.auth.eliminarUsuario(email);
    this.cargarUsuarios();
  }
}
