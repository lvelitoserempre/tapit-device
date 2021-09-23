import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodigosComponent } from './promo-codigos.component';

describe('PromoCodigosComponent', () => {
  let component: PromoCodigosComponent;
  let fixture: ComponentFixture<PromoCodigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoCodigosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
