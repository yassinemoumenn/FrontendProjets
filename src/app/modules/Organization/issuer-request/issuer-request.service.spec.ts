import { TestBed } from '@angular/core/testing';

import { IssuersRequestsService } from './issuer-request.service';

describe('IssuersRequestsService', () => {
  let service: IssuersRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuersRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
