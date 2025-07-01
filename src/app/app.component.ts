import { Component } from '@angular/core';

/**
 * Componente raíz de la aplicación Angular.
 * Contiene la estructura principal y el punto de entrada de la app.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Título de la aplicación.
   */
  title = 'frontend';
}
