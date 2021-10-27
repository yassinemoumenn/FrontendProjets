import {
  ICertificateState,
  CertificateStatus,
  certificateModel
} from './../issuer/certificates/certificate.model';
import { ResponseObject } from './../../models/helpers/ResponseObject';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { environment } from '../../../../src/environments/environment';

import { RecipientService } from './recipient.service';
import { HttpClient } from '@angular/common/http';

describe('RecipientService', () => {
  let service: RecipientService;
  let httpTestingController: HttpTestingController;
  const API_Recipient_URL = `${environment.apiUrl}/recipient`;
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipientService, HttpClient]
    });
    service = TestBed.inject(RecipientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getCertificate', () => {
    it('makes expected calls', (done) => {
      const certId = 'certificate_Id';
      const certificateState: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };

      const certificate = new certificateModel({
        category: 'categoryId',
        issuer: 'issuerId',
        recipient: 'recipientId',
        design: 'designId',
        state: certificateState
      });

      const responseSubject: ResponseObject<certificateModel> = {
        success: true,
        message: 'certificate',
        data: certificate
      };

      service
        .getCertificate(certId)
        .subscribe((res: ResponseObject<certificateModel>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificate);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_Recipient_URL}/certificate/${certId}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(responseSubject);
    });
  });
});
