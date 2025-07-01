import { Component } from '@angular/core';

/**
 * Componente principal de la página de inicio.
 * Muestra un carrusel de imágenes y certificaciones.
 * Ademas de las categorias de productos disponibles.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Imágenes del carrusel */
  carouselImages = [
    'assets/img/img7.jpg',
    'assets/img/img8.jpg',
    'assets/img/img9.jpg',
    'assets/img/img10.jpg',
    'assets/img/img11.jpg',
    'assets/img/img12.jpg'
  ];

  /** Imágenes de certificaciones */
  certificaciones = [
    'assets/img/certificacion1.png',
    'assets/img/certificacion2.jpg',
    'assets/img/certificacion3.jpg',
    'assets/img/certificacion4.png',
    'assets/img/certificacion5.jpg'
  ];

  /** Índice de la diapositiva actual */
  currentSlide = 0;

  /**
   * Cambia la diapositiva del carrusel.
   * @param direction Dirección del cambio (-1 o 1)
   */
  moveSlide(direction: number) {
    this.currentSlide = (this.currentSlide + direction + this.carouselImages.length) % this.carouselImages.length;
  }

  /**
   * Establece la diapositiva actual.
   * @param index Índice de la diapositiva
   */
  setCurrentSlide(index: number) {
    this.currentSlide = index;
  }
}
