import { Injectable } from '@angular/core';

/**
 * Servicio global de autenticación y gestión de usuarios.
 * Permite login, logout, registro, edición y consulta de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** Usuario actualmente logueado */
  private usuario: any = null;
  /** Usuario administrador predefinido */
  private admin = { email: 'admin@admin.com', password: 'Admin123', nombre: 'Administrador', rol: 'admin' };

  /**
   * Constructor del servicio AuthService.
   * Inicializa el servicio de autenticación y gestión de usuarios.
   */
  constructor() { }

  /**
   * Obtiene todos los usuarios del sistema (incluye admin).
   * @returns Array de usuarios
   */
  private getUsuarios(): any[] {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // Asegura que el admin siempre esté
    if (!usuarios.find((u: any) => u.email === this.admin.email)) {
      usuarios.unshift(this.admin);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    return usuarios;
  }

  /**
   * Guarda la lista de usuarios en localStorage.
   * @param usuarios Array de usuarios
   */
  private setUsuarios(usuarios: any[]) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  /**
   * Inicia sesión con email y contraseña.
   * @param email Email del usuario
   * @param password Contraseña
   * @returns true si login exitoso
   */
  login(email: string, password: string): boolean {
    const usuarios = this.getUsuarios();
    const user = usuarios.find((u: any) => u.email === email && u.password === password);
    if (user) {
      this.usuario = { ...user };
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }

  /**
   * Indica si hay un usuario logueado.
   * @returns true si hay sesión activa
   */
  isLoggedIn(): boolean {
    return !!(this.usuario || localStorage.getItem('usuario'));
  }

  /**
   * Obtiene el usuario actualmente logueado.
   * @returns Usuario actual o null
   */
  getUsuario() {
    return this.usuario || JSON.parse(localStorage.getItem('usuario') || 'null');
  }

  /**
   * Indica si el usuario actual es administrador.
   * @returns true si es admin
   */
  isAdmin(): boolean {
    const user = this.getUsuario();
    return user && user.rol === 'admin';
  }

  /**
   * Registra un nuevo usuario.
   * @param datos Datos del usuario
   * @returns true si registro exitoso
   */
  registrar(datos: any): boolean {
    const usuarios = this.getUsuarios();
    if (usuarios.find((u: any) => u.email === datos.email)) return false;
    const nuevo = {
      ...datos,
      rol: 'user',
      apellido: datos.apellido || '',
      telefono: datos.telefono || '',
      direccion: datos.direccion || '',
      fechaNacimiento: datos.fechaNacimiento || '',
      password: datos.password
    };
    usuarios.push(nuevo);
    this.setUsuarios(usuarios);
    this.usuario = { ...nuevo };
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    return true;
  }

  /**
   * Devuelve todos los usuarios del sistema.
   * @returns Array de usuarios
   */
  getAllUsuarios(): any[] {
    return this.getUsuarios();
  }

  /**
   * Actualiza los datos de un usuario.
   * @param email Email del usuario a actualizar
   * @param cambios Objeto con los cambios
   */
  updateUsuario(email: string, cambios: any) {
    const usuarios = this.getUsuarios();
    const idx = usuarios.findIndex((u: any) => u.email === email);
    if (idx > -1) {
      usuarios[idx] = { ...usuarios[idx], ...cambios };
      this.setUsuarios(usuarios);
      if (this.getUsuario()?.email === email) {
        this.usuario = { ...usuarios[idx] };
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      }
    }
  }

  /**
   * Elimina un usuario por email.
   * @param email Email del usuario a eliminar
   */
  eliminarUsuario(email: string) {
    const usuarios = this.getAllUsuarios().filter((u: any) => u.email !== email);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    // Si el usuario eliminado es el logueado, cerrar sesión
    if (this.getUsuario()?.email === email) {
      this.logout();
    }
  }
}
