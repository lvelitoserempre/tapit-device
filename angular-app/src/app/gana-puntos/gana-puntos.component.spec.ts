import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanaPuntosComponent } from './gana-puntos.component';

describe('GanaPuntosComponent', () => {
  let component: GanaPuntosComponent;
  let fixture: ComponentFixture<GanaPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanaPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanaPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
