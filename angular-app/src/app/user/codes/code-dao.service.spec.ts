import { TestBed } from '@angular/core/testing';

import { CodeDAO } from './code-dao.service';

describe('UserService', () => {
  let service: CodeDAO;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeDAO);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
