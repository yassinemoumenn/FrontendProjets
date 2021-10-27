import { TestBed } from '@angular/core/testing';

import { MultipleUploadService } from './multiple-upload.service';

describe('MultipleUploadService', () => {
  let service: MultipleUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
