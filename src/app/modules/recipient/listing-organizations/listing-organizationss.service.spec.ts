import { TestBed } from '@angular/core/testing';

import { ListingOrganizationssService } from './listing-organizationss.service';

describe('ListingOrganizationssService', () => {
  let service: ListingOrganizationssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingOrganizationssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
