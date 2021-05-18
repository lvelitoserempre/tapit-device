import { TestBed } from '@angular/core/testing';

import { VerifyIdentityService } from './verify-identity.service';

describe('VerifyIdentityService', () => {
  let service: VerifyIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
