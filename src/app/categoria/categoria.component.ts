import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CarritoService } from 'src/app/services/carrito.service';

/**
 * Componente de categoría de productos.
 * Muestra productos según la categoría seleccionada y permite agregarlos al carrito.
 */
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  /** Lista de productos de la categoría */
  productos: any[] = [];
  /** Nombre de la categoría actual */
  nombreCategoria: string = '';

  /**
   * Constructor. Inyecta servicios de ruta, categoría y carrito.
   */
  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService
  ) {}

  /**
   * Inicializa el componente y carga los productos de la categoría.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.nombreCategoria = params.get('nombre') || '';
      this.productos = this.categoriaService.getProductos(this.nombreCategoria);
    });
  }

  /**
   * Agrega un producto al carrito.
   * @param producto Producto a agregar
   */
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
    // Opcional: mostrar mensaje de éxito
    // alert('Producto agregado al carrito');
  }
}
