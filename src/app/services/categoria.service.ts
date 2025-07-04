import { Injectable } from '@angular/core';

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
  private categorias: any = {
  buggys: [
    { nombre: 'Neumáticos off-road 28"', precio: 120000, imagen: 'assets/img/buggy_neumatico.jpg' },
    { nombre: 'Amortiguadores FOX Racing', precio: 450000, imagen: 'assets/img/buggy_amortiguador.jpg' },
    { nombre: 'Filtro de aire K&N', precio: 80000, imagen: 'assets/img/buggy_filtro_aire.png' },
    { nombre: 'Escape deportivo', precio: 350000, imagen: 'assets/img/buggy_escape.png' }
  ],
  carroceria: [
    { nombre: 'Chasis', precio: 150000, imagen: 'assets/img/Chasis.jpg' },
    { nombre: 'Jaula antivuelco completa', precio: 780000, imagen: 'assets/img/jaula.jpg' },
    { nombre: 'Capot reforzado', precio: 250000, imagen: 'assets/img/Capot reforzado.jpg' },
    { nombre: 'Protectores bajos de aluminio', precio: 180000, imagen: 'assets/img/Protectores bajos de aluminio.jpg' }
  ],
  confort: [
    { nombre: 'Parabrisas', precio: 50000, imagen: 'assets/img/Parabrisas.jpg' },
    { nombre: 'Techos', precio: 80000, imagen: 'assets/img/Techos.jpg' },
    { nombre: 'Fundas de asiento', precio: 250000, imagen: 'assets/img/Fundas de asiento.jpg' },
    { nombre: 'Volantes con grip', precio: 180000, imagen: 'assets/img/Volantes con grip.jpg' }
  ],
  iluminacion: [
    { nombre: 'Barra LED 40"', precio: 220000, imagen: 'assets/img/iluminacion_barra_led.jpg' },
    { nombre: 'Faros auxiliares LED', precio: 65000, imagen: 'assets/img/iluminacion_faro_auxiliar.avif' },
    { nombre: 'Kit luces traseras LED', precio: 90000, imagen: 'assets/img/iluminacion_trasera.jpg' },
    { nombre: 'Kit luces intermitentes LED', precio: 55000, imagen: 'assets/img/iluminacion_intermitentes.jpg' }
  ],
  motor: [
    { nombre: 'Kits de turbo', precio: 120000, imagen: 'assets/img/Kits de turbo.jpg' },
    { nombre: 'Filtros de aire de alto flujo', precio: 80000, imagen: 'assets/img/Filtros de aire de alto flujo.jpg' },
    { nombre: 'Radiadores', precio: 50000, imagen: 'assets/img/Radiadores.jpg' },
    { nombre: 'Correas', precio: 18000, imagen: 'assets/img/Correas.jpg' }
  ]
};


  /**
   * Obtiene los productos de una categoría específica.
   * @param categoria Nombre de la categoría
   * @returns Array de productos de la categoría
   */
  getProductos(categoria: string) {
    return this.categorias[categoria] || [];
  }
}
