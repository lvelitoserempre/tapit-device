import { TestBed } from '@angular/core/testing';

import { RemoteConfigGuard } from './remote-config.guard';

describe('RemoteConfigGuard', () => {
  let guard: RemoteConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RemoteConfigGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
