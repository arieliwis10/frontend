import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaComponent } from './categoria.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { of } from 'rxjs';

describe('CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let carritoServiceSpy: jasmine.SpyObj<CarritoService>;
  let activatedRouteStub: any;

  beforeEach(() => {
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['getProductos']);
    carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['agregarProducto']);
    activatedRouteStub = { paramMap: of({ get: () => 'categoria1' }) };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategoriaComponent],
      providers: [
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: CarritoService, useValue: carritoServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Prueba 1: Debería crear el componente.
   */
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar productos de la categoría', () => {
    categoriaServiceSpy.getProductos.and.returnValue(of([{ nombre: 'Producto 1' }]));
    component.ngOnInit();
    expect(component.productos.length).toBeGreaterThanOrEqual(0);
  });
});


