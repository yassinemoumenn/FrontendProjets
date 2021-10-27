import { TestBed } from '@angular/core/testing';

import { ViewCertificatesService } from './view-certificates.service';

describe('ViewCertificatesService', () => {
  let service: ViewCertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
