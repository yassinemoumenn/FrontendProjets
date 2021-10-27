import { TestBed } from '@angular/core/testing';

import { EmailSystemService } from './email-system.service';

describe('EmailSystemService', () => {
  let service: EmailSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
