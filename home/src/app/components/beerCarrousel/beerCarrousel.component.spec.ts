import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCarrouselComponent } from './beerCarrousel.component';

describe('BeerCarrouselComponent', () => {
  let component: BeerCarrouselComponent;
  let fixture: ComponentFixture<BeerCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerCarrouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
