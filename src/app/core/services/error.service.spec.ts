import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ErrorService] });
    service = TestBed.inject(ErrorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
