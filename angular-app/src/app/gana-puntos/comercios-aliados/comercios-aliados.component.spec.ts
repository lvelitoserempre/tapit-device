import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComerciosAliadosComponent } from './comercios-aliados.component';

describe('ComerciosAliadosComponent', () => {
  let component: ComerciosAliadosComponent;
  let fixture: ComponentFixture<ComerciosAliadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComerciosAliadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComerciosAliadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
