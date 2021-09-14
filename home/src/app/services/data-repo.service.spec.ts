import { TestBed } from '@angular/core/testing';

import { DataRepoService } from './data-repo.service';

describe('DataRepoService', () => {
  let service: DataRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
