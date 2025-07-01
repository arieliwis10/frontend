import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio global para gestión del carrito de compras.
 * Permite agregar, eliminar, limpiar y observar productos del carrito.
 */
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  /** Lista de productos en el carrito */
  private productos: any[] = [];
  /** Subject para notificar cambios en el carrito */
  private productosSubject = new BehaviorSubject<any[]>(this.productos);
  /** Observable de productos del carrito */
  productos$ = this.productosSubject.asObservable();

  /**
   * Agrega un producto al carrito.
   * @param producto Producto a agregar
   */
  agregarProducto(producto: any) {
    this.productos.push(producto);
    this.productosSubject.next(this.productos);
  }

  /**
   * Obtiene la lista de productos del carrito.
   * @returns Array de productos
   */
  obtenerProductos() {
    return this.productos;
  }

  /**
   * Vacía el carrito de compras.
   */
  limpiarCarrito() {
    this.productos = [];
    this.productosSubject.next(this.productos);
  }

  /**
   * Elimina un producto del carrito.
   * @param producto Producto a eliminar
   */
  eliminarProducto(producto: any) {
    const index = this.productos.findIndex(
      p => p.nombre === producto.nombre && p.precio === producto.precio && p.imagen === producto.imagen
    );
    if (index > -1) {
      this.productos.splice(index, 1);
      this.productosSubject.next(this.productos);
    }
  }
}
