import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardPromotedComponent } from './coupon-card-promoted.component';

describe('CouponCardPromotedComponent', () => {
  let component: CouponCardPromotedComponent;
  let fixture: ComponentFixture<CouponCardPromotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCardPromotedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCardPromotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
