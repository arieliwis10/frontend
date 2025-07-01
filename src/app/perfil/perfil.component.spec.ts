import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil.component';
import { AuthService } from '../services/auth.service';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuario', 'updateUsuario']);
    TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(PerfilComponent);
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
