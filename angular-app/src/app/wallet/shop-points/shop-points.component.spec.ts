import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPointsComponent } from './shop-points.component';

describe('ShopPointsComponent', () => {
  let component: ShopPointsComponent;
  let fixture: ComponentFixture<ShopPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
