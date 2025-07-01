import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Componente de barra de navegación principal.
 * Muestra enlaces de navegación, el estado de login, el nombre del usuario y el contador del carrito.
 * Se actualiza automáticamente al navegar o cambiar el estado de autenticación/carrito.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /** Indica si el usuario está logueado */
  isLoggedIn = false;
  /** Indica si el usuario es administrador */
  isAdmin = false;
  /** Cantidad de productos en el carrito */
  carritoCantidad = 0;
  /** Objeto de usuario logueado */
  usuario: any = null;

  /**
   * Constructor. Suscribe a eventos de navegación para actualizar el estado del navbar.
   * @param carritoService Servicio global del carrito
   * @param auth Servicio de autenticación
   * @param router Router de Angular
   */
  constructor(private carritoService: CarritoService, private auth: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarEstado();
      }
    });
  }

  /**
   * Inicializa el componente, suscribiéndose al carrito y actualizando el estado de login/admin.
   */
  ngOnInit() {
    this.actualizarEstado();
    this.carritoService.productos$.subscribe(productos => {
      this.carritoCantidad = productos.length;
    });
    this.actualizarCantidad();
  }

  /**
   * Actualiza el estado de login, usuario y admin en el navbar.
   */
  actualizarEstado() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.usuario = this.auth.getUsuario();
    this.isAdmin = this.auth.isAdmin();
  }

  /**
   * Actualiza la cantidad de productos en el carrito.
   */
  actualizarCantidad() {
    this.carritoCantidad = this.carritoService.obtenerProductos().length;
  }

  /**
   * Cierra la sesión del usuario y actualiza el estado del navbar.
   */
  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.usuario = null;
    this.isAdmin = false;
  }
}
