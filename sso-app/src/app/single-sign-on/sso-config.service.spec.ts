import { TestBed } from '@angular/core/testing';

import { SSOConfigService } from './sso-config.service';

describe('ConfigService', () => {
  let service: SSOConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSOConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
