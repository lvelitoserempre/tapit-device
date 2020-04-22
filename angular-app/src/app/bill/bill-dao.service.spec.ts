import { TestBed } from '@angular/core/testing';

import { BillDAOService } from './bill-dao.service';

describe('BillDAOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillDAOService = TestBed.get(BillDAOService);
    expect(service).toBeTruthy();
  });
});
