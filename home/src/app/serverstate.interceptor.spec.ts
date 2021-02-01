import { TestBed } from '@angular/core/testing';

import { ServerstateInterceptor } from './serverstate.interceptor';

describe('ServerstateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerstateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerstateInterceptor = TestBed.inject(ServerstateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
