import {TestBed} from '@angular/core/testing';

import {EventDAOService} from './event-dao.service';

describe('EventDAOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventDAOService = TestBed.get(EventDAOService);
    expect(service).toBeTruthy();
  });
});
