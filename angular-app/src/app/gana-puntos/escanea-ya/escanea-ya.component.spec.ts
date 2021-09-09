import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscaneaYaComponent } from './escanea-ya.component';

describe('EscaneaYaComponent', () => {
  let component: EscaneaYaComponent;
  let fixture: ComponentFixture<EscaneaYaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscaneaYaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscaneaYaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
