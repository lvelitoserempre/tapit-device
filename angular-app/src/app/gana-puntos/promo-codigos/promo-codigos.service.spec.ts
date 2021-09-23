import { TestBed } from '@angular/core/testing';

import { PromoCodigosService } from './promo-codigos.service';

describe('PromoCodigosService', () => {
  let service: PromoCodigosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoCodigosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
