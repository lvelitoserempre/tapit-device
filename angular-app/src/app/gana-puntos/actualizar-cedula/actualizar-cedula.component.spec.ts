import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCedulaComponent } from './actualizar-cedula.component';

describe('ActualizarCedulaComponent', () => {
  let component: ActualizarCedulaComponent;
  let fixture: ComponentFixture<ActualizarCedulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCedulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCedulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
