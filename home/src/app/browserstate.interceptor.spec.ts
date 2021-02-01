import { TestBed } from '@angular/core/testing';

import { BrowserstateInterceptor } from './browserstate.interceptor';

describe('BrowserstateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BrowserstateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BrowserstateInterceptor = TestBed.inject(BrowserstateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
