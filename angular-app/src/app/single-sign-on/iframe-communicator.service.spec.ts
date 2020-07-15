import { TestBed } from '@angular/core/testing';

import { IframeCommunicatorService } from './iframe-communicator.service';

describe('IframeCommunicatorService', () => {
  let service: IframeCommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IframeCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
