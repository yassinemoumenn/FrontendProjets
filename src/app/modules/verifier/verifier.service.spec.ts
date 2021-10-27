import {
  ICertificateState,
  CertificateStatus,
  certificateModel
} from './../issuer/certificates/certificate.model';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { VerifierService } from './verifier.service';
import { environment } from '../../../../src/environments/environment';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { HttpClient } from '@angular/common/http';

describe('VerifierService', () => {
  let service: VerifierService;
  let httpTestingController: HttpTestingController;
  const API_VERIFIER_URL = `${environment.apiUrl}/verifier`;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VerifierService, HttpClient]
    });
    service = TestBed.inject(VerifierService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getVerifierGroups', () => {
    it('makes expected calls', (done) => {
      const verifierGroups: string[] = ['groupdId1', 'groupId2'];
      const responseSubject: ResponseObject<string[]> = {
        success: true,
        message: 'Certificates have been successfully Listed',
        data: verifierGroups
      };

      service.getVerifierGroups().subscribe((res: ResponseObject<string[]>) => {
        expect(res.success).toBe(true);
        expect(res.data).toBeDefined();
        expect(res.data).toEqual(verifierGroups);
        done();
      });

      const req = httpTestingController.expectOne(`${API_VERIFIER_URL}/groups`);

      expect(req.request.method).toEqual('GET');
      req.flush(responseSubject);
    });
  });

  describe('getCertificates', () => {
    it('makes expected calls', (done) => {
      const certificateState: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };

      const certificates: certificateModel[] = [
        {
          category: 'category_id',
          issuer: 'issuer_id',
          recipient: 'recipient_id',
          design: 'design_id',
          state: certificateState
        }
      ];

      const responseSubject: ResponseObject<certificateModel[]> = {
        success: true,
        message: 'Certificates have been successfully Listed',
        data: certificates
      };

      service
        .getCertificates()
        .subscribe((res: ResponseObject<certificateModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificates);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_VERIFIER_URL}/certificates`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(responseSubject);
    });
  });
});
