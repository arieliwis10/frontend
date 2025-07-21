import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * Servicio para la gestión de categorías y productos asociados.
 * Proporciona acceso a los productos de cada categoría.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  /**
   * Diccionario de categorías y sus productos.
   */
  constructor(private http: HttpClient) {}


  /**
   * Obtiene los productos de una categoría específica.
   * @param categoria Nombre de la categoría
   * @returns Array de productos de la categoría
   */
  getProductos(categoria: string): Observable<any[]> {
    return this.http.get<any>('assets/productos.json').pipe(
      map(data => data[categoria] || [])
    );
  }

  /**
   * Agrega un producto a una categoría.
   */
  // Métodos de agregar, editar y eliminar productos quedan deshabilitados en modo solo lectura desde JSON
}
