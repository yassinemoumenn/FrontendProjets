import {
  IAddress,
  IAccountSettings,
  INotification
} from './../../../models/User';
import { SignerModel } from './../../signer/Signer.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../environments/environment';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SignerService } from './signer.service';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../../../../src/app/models/User';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

describe('SignerService', () => {
  let service: SignerService;
  let httpTestingController: HttpTestingController;
  const API_SIGNER_URL = `${environment.apiUrl}/issuer/signers`;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SignerService,
        HttpClient,
        { provide: MatDialog, useValue: {} }
      ]
    });
    service = TestBed.inject(SignerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Add Signer', () => {
    it('makes expected calls', (done) => {
      const address: IAddress = {
        country: 'morroco'
      };
      const notification: INotification = {
        sms: false,
        email: false,
        app: true
      }
      const settings: IAccountSettings = {
        notification: notification,
        twoFactorAuthentication: true,
        passwordResetVerification: true
      };

      const signer: SignerModel = {
        firstname: 'SignerFirstName',
        lastname: 'SignerFirstName',
        birthday: new Date(),
        role: Role.SIGNER,
        address: address,
        accountSettings: settings,
        groups: ["GRP-353252"]
      };
      const responseSubject: ResponseObject<SignerModel> = {
        success: true,
        message: 'Signer Registration Successfull',
        data: signer
      };
      service
        .addSigner(signer)
        .subscribe((res: ResponseObject<SignerModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(signer);
          done();
        });
      const req = httpTestingController.expectOne(`${API_SIGNER_URL}/`);
      expect(req.request.method).toBe('POST');
      req.flush(responseSubject);
    });
  });

  describe('All Signers', () => {
    it('makes expected calls', (done) => {
      const address: IAddress = {
        country: 'morroco'
      };
      const settings: IAccountSettings = {
        accountNotification: IAccountNotification.BOTH,
        twoFactorAuthentication: true,
        passwordResetVerification: true
      };
      const signers: SignerModel[] = [
        {
          firstname: 'SignerFirstName',
          lastname: 'SignerFirstName',
          password: 'password',
          birthday: new Date(),
          role: Role.SIGNER,
          address: address,
          accountSettings: settings
        }
      ];
      const responseSubject: ResponseObject<SignerModel[]> = {
        success: true,
        message: 'Signer data',
        data: signers
      };

      const page = 1;
      const size = 9;

      service
        .getSigners(size, page)
        .subscribe((res: ResponseObject<SignerModel[]>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(signers);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_SIGNER_URL}?page=${page + 1}&size=${size}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(responseSubject);
    });
  });

  describe('Find One Signer', () => {
    it('makes expected calls', (done) => {
      const idSigner = 'signerId';
      const address: IAddress = {
        country: 'morroco'
      };
      const settings: IAccountSettings = {
        accountNotification: IAccountNotification.BOTH,
        twoFactorAuthentication: true,
        passwordResetVerification: true
      };
      const signer: SignerModel = {
        firstname: 'SignerFirstName',
        lastname: 'SignerFirstName',
        password: 'password',
        birthday: new Date(),
        role: Role.SIGNER,
        address: address,
        accountSettings: settings
      };
      service.findOneSigner(idSigner).subscribe((res: SignerModel) => {
        expect(res).toBeDefined();
        expect(res).toEqual(signer);
        done();
      });
      const req = httpTestingController.expectOne(
        `${API_SIGNER_URL}/${idSigner}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(signer);
    });
  });

  describe('Update Signer', () => {
    it('makes expected calls', (done) => {
      const idSigner = 'signerId';
      const address: IAddress = {
        city: 'meknes'
      };
      const accountSettings: IAccountSettings = {
        accountNotification: IAccountNotification.BOTH,
        twoFactorAuthentication: true,
        passwordResetVerification: true
      };
      const signer: SignerModel = {
        firstname: 'chaimae',
        lastname: 'el mantih',
        password: 'password',
        birthday: new Date(),
        role: Role.SIGNER,
        address: address,
        accountSettings: accountSettings
      };
      const response: ResponseObject<SignerModel> = {
        success: true,
        message: 'Signer updated successfully',
        data: signer
      };
      service
        .updateSigner(idSigner, signer)
        .subscribe((res: ResponseObject<SignerModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(signer);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_SIGNER_URL}/${idSigner}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(response);
    });
  });

  describe('Delete Signer', () => {
    it('makes expected calls', (done) => {
      const idSigner = 'SignerId';
      const response: ResponseObject<number> = {
        success: true,
        message: 'Signer deleted successfully',
        data: 1
      };
      service
        .deleteSigner(idSigner)
        .subscribe((res: ResponseObject<number>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toEqual(1);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_SIGNER_URL}/${idSigner}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(response);
    });
  });
});
