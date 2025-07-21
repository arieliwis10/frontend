import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AuthService } from 'src/app/services/auth.service';

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
  editIndex: number | null = null;
  productoEditado: any = { nombre: '', precio: null, imagen: '' };
  // Producto temporal para el formulario simulado
  nuevoProducto: any = { nombre: '', precio: null, imagen: '' };
  /** Lista de productos de la categoría */
  productos: any[] = [];
  /** Nombre de la categoría actual */
  nombreCategoria: string = '';
  isAdmin: boolean = false;

  /**
   * Constructor. Inyecta servicios de ruta, categoría y carrito.
   */
  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  /**
   * Inicializa el componente y carga los productos de la categoría.
   */
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin && this.authService.isAdmin();
    this.route.paramMap.subscribe(params => {
      this.nombreCategoria = params.get('nombre') || '';
      this.categoriaService.getProductos(this.nombreCategoria).subscribe(productos => {
        this.productos = productos;
      });
    });
  }

  // Simula agregar producto solo en memoria
  agregarProductoSimulado() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.precio) {
      // Si no hay imagen, usa una por defecto
      const producto = {
        nombre: this.nuevoProducto.nombre,
        precio: this.nuevoProducto.precio,
        imagen: this.nuevoProducto.imagen || 'assets/img/default.jpg'
      };
      this.productos.push(producto);
      this.nuevoProducto = { nombre: '', precio: null, imagen: '' };
    }
  }

  // Inicia edición de producto
  iniciarEdicion(index: number) {
    this.editIndex = index;
    this.productoEditado = { ...this.productos[index] };
  }

  // Guarda cambios simulados
  guardarEdicion() {
    if (this.editIndex !== null) {
      this.productos[this.editIndex] = { ...this.productoEditado };
      this.editIndex = null;
    }
  }

  cancelarEdicion() {
    this.editIndex = null;
  }

  // Permite previsualizar imagen en edición
  onFileSelectedEdit(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productoEditado.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Elimina producto solo en memoria
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
    }
  }

  // Permite previsualizar imagen localmente
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nuevoProducto.imagen = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
