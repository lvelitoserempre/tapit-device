import { TestBed } from '@angular/core/testing';

import { RedirectToMarketGuard } from './redirect-to-market.guard';

describe('RedirectToMarketGuard', () => {
  let guard: RedirectToMarketGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectToMarketGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
