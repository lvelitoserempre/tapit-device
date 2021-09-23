import { TestBed } from '@angular/core/testing';

import { QrcodeReaderService } from './qrcode-reader.service';

describe('QrcodeReaderService', () => {
  let service: QrcodeReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrcodeReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
