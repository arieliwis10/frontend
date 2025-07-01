import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoComponent } from './carrito.component';
import { CarritoService } from '../services/carrito.service';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let carritoServiceSpy: jasmine.SpyObj<CarritoService>;

  beforeEach(() => {
    carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['obtenerProductos', 'agregarProducto', 'eliminarProducto', 'limpiarCarrito']);
    carritoServiceSpy.obtenerProductos.and.returnValue([]); // Siempre retorna un array
    TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      providers: [
        { provide: CarritoService, useValue: carritoServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba 1: Debería crear el componente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});


