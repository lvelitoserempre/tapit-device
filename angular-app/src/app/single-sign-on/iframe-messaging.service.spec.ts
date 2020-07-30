import { TestBed } from '@angular/core/testing';

import { IframeMessagingService } from './iframe-messaging.service';

describe('IframeCommunicatorService', () => {
  let service: IframeMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IframeMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
