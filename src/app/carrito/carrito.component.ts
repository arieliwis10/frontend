import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

/**
 * Componente de carrito de compras.
 * Permite ver, modificar y eliminar productos del carrito.
 */
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  /** Lista de productos en el carrito */
  productos: any[] = [];

  /**
   * Constructor. Inyecta el servicio de carrito.
   */
  constructor(private carritoService: CarritoService) {}

  /**
   * Inicializa el componente y agrupa los productos del carrito.
   */
  ngOnInit(): void {
    this.productos = this.carritoService.obtenerProductos();
    this.agruparProductos();
  }

  /**
   * Vacía el carrito de compras.
   */
  limpiarCarrito() {
    this.carritoService.limpiarCarrito();
    this.productos = [];
  }

  /**
   * Elimina un producto del carrito.
   * @param producto Producto a eliminar
   */
  eliminarProducto(producto: any) {
    this.carritoService.eliminarProducto(producto);
    this.productos = this.carritoService.obtenerProductos();
    this.agruparProductos();
  }

  /**
   * Agrupa productos por nombre y suma cantidades.
   */
  agruparProductos() {
    // Agrupa productos por nombre y suma cantidades
    const agrupados: any = {};
    for (const prod of this.productos) {
      const key = prod.nombre;
      if (!agrupados[key]) {
        agrupados[key] = { ...prod, cantidad: 1 };
      } else {
        agrupados[key].cantidad++;
      }
    }
    this.productos = Object.values(agrupados);
  }

  /**
   * Calcula el total del carrito.
   * @returns Total en CLP
   */
  getTotal(): number {
    return this.productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  }

  /**
   * Cambia la cantidad de un producto en el carrito.
   * @param producto Producto a modificar
   * @param cambio +1 para aumentar, -1 para disminuir
   */
  cambiarCantidad(producto: any, cambio: number) {
    const prod = this.productos.find(p => p.nombre === producto.nombre);
    if (!prod) return;
    if (cambio === 1) {
      this.carritoService.agregarProducto(prod);
    } else if (cambio === -1 && prod.cantidad > 1) {
      this.carritoService.eliminarProducto(prod);
    }
    this.productos = this.carritoService.obtenerProductos();
    this.agruparProductos();
  }
}
