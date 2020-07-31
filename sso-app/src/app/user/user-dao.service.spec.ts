import { TestBed } from '@angular/core/testing';

import { UserDAO } from './user-dao.service';

describe('UserService', () => {
  let service: UserDAO;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDAO);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
