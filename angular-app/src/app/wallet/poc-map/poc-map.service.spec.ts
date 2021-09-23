import { TestBed } from '@angular/core/testing';

import { PocMapService } from './poc-map.service';

describe('PocMapService', () => {
  let service: PocMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
