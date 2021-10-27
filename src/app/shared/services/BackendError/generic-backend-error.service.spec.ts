import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SharedSnackbarService } from 'src/app/shared/services/snackbar/shared-snackbar.service';
import { GenericBackendErrorService } from './generic-backend-error.service';

describe('GenericBackendErrorService', () => {
  let service: GenericBackendErrorService;

  beforeEach(() => {
    const translateServiceStub = () => ({ instant: (arg, arg1) => ({}) });
    const sharedSnackbarServiceStub = () => ({ push: (arg) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        GenericBackendErrorService,
        { provide: TranslateService, useFactory: translateServiceStub },
        {
          provide: SharedSnackbarService,
          useFactory: sharedSnackbarServiceStub
        }
      ]
    });
    service = TestBed.inject(GenericBackendErrorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
