import { ResponseObject } from './../../../models/helpers/ResponseObject';
import {
  ICertificateState,
  CertificateStatus,
  certificateModel
} from './certificate.model';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../../../src/environments/environment';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClient } from '@angular/common/http';
import { CertificateService } from './certificate.service';

describe('CertificateService', () => {
  let service: CertificateService;
  let httpTestingController: HttpTestingController;
  const API_CERTIFICATE_URL = `${environment.apiUrl}/certificates`;
  const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CertificateService, HttpClient]
    });
    service = TestBed.inject(CertificateService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('create Certificate', () => {
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

      const responseObject: ResponseObject<certificateModel[]> = {
        success: true,
        message: 'Certificate created successfully',
        data: certificates
      };

      service
        .createCertificate(certificates)
        .subscribe((res: ResponseObject<certificateModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificates);
          done();
        });

      const req = httpTestingController.expectOne(`${API_CERTIFICATE_URL}/`);

      expect(req.request.method).toEqual('POST');
      req.flush(responseObject);
    });
  });

  describe('Get Certificate', () => {
    it('makes expected calls', (done) => {
      const certificateId = 'certificateId';
      const certificateState: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };

      const certificate: certificateModel = {
        category: 'category_id',
        issuer: 'issuer_id',
        recipient: 'recipient_id',
        design: 'design_id',
        state: certificateState
      };

      const responseObject: ResponseObject<certificateModel> = {
        success: true,
        message: 'Certificate data',
        data: certificate
      };

      service
        .getCertificate(certificateId)
        .subscribe((res: ResponseObject<certificateModel>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificate);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_CERTIFICATE_URL}/${certificateId}`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(responseObject);
    });
  });

  describe('Get Certificates', () => {
    it('makes expected calls', (done) => {
      const certificateId = 'certificateId';
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

      const responseObject: ResponseObject<certificateModel[]> = {
        success: true,
        message: 'Certificate data',
        data: certificates
      };

      service
        .getAllCertificates(3, 4)
        .subscribe((res: ResponseObject<certificateModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificates);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_CERTIFICATE_URL}/certificates?page=3&size=4`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(responseObject);
    });
  });

  describe('update Certificate', () => {
    it('makes expected calls', (done) => {
      const certificateId = 'certificateId';
      const certificateState: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };

      const certificate: certificateModel = {
        category: 'category_id',
        issuer: 'issuer_id',
        recipient: 'recipient_id',
        design: 'design_id',
        state: certificateState
      };

      const responseObject: ResponseObject<certificateModel> = {
        success: true,
        message: 'Certificate updated successfully',
        data: certificate
      };

      service
        .updateCertificate(certificateId, certificate)
        .subscribe((res: ResponseObject<certificateModel>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificate);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_CERTIFICATE_URL}/${certificateId}`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });

  describe('update Certificates', () => {
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

      const responseObject: ResponseObject<certificateModel[]> = {
        success: true,
        message: 'Certificates updated successfully',
        data: certificates
      };

      service
        .updateCertificates(certificates)
        .subscribe((res: ResponseObject<certificateModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificates);
          done();
        });

      const req = httpTestingController.expectOne(`${API_CERTIFICATE_URL}/`);

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });

  describe('Delete Certificate', () => {
    it('makes expected calls', (done) => {
      const certificateID: string = 'certificate_ID';

      const responseObject: ResponseObject<number> = {
        success: true,
        message: 'Certificate deleted successfully',
        data: 1
      };

      service
        .deleteCertificate(certificateID)
        .subscribe((res: ResponseObject<number>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(1);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_CERTIFICATE_URL}/${certificateID}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.flush(responseObject);
    });
  });

  describe('Delete Certificates', () => {
    it('makes expected calls', (done) => {
      const certificateIDS: string[] = [
        'certificate_ID1',
        'certificate_ID2',
        'certificate_ID3'
      ];

      const responseObject: ResponseObject<number> = {
        success: true,
        message: 'Certificates deleted successfully',
        data: certificateIDS.length
      };

      service
        .deleteCertificates(certificateIDS)
        .subscribe((res: ResponseObject<number>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificateIDS.length);
          done();
        });

      const req = httpTestingController.expectOne(`${API_CERTIFICATE_URL}/`);

      expect(req.request.method).toEqual('DELETE');
      req.flush(responseObject);
    });
  });

  describe('cancel Certificate', () => {
    it('makes expected calls', (done) => {
      const certificateId = 'certificateId';
      const certificateState: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CANCELLED
      };

      const certificate: certificateModel = {
        category: 'category_id',
        issuer: 'issuer_id',
        recipient: 'recipient_id',
        design: 'design_id',
        state: certificateState
      };

      const responseObject: ResponseObject<certificateModel> = {
        success: true,
        message: 'Certificate cancelled successfully',
        data: certificate
      };

      service
        .cancelCertificate(certificateId)
        .subscribe((res: ResponseObject<certificateModel>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificate);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_CERTIFICATE_URL}/${certificateId}/cancel`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });

  describe('cancel Certificates', () => {
    it('makes expected calls', (done) => {
      const certificateIds = ['certificate_Id1', 'certificate_Id2'];
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

      const responseObject: ResponseObject<certificateModel[]> = {
        success: true,
        message: 'Certificates cancelled successfully',
        data: certificates
      };

      service
        .cancelCertificates(certificateIds)
        .subscribe((res: ResponseObject<certificateModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificates);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_CERTIFICATE_URL}/cancel`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });
  describe('revoke Certificate', () => {
    it('makes expected calls', (done) => {
      const certificateId = 'certificateId';
      const certificateState: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };

      const certificate: certificateModel = {
        category: 'category_id',
        issuer: 'issuer_id',
        recipient: 'recipient_id',
        design: 'design_id',
        state: certificateState
      };

      const responseObject: ResponseObject<certificateModel> = {
        success: true,
        message: 'Certificate revoked successfully',
        data: certificate
      };

      service
        .revokeCertificate(certificateId)
        .subscribe((res: ResponseObject<certificateModel>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificate);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/certificates/${certificateId}/revoke`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });

  describe('revoke Certificates', () => {
    it('makes expected calls', (done) => {
      const certificateIds = ['certificate_Id1', 'certificate_Id2'];
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

      const responseObject: ResponseObject<certificateModel[]> = {
        success: true,
        message: 'Certificates revoked successfully',
        data: certificates
      };

      service
        .revokeCertificates(certificateIds)
        .subscribe((res: ResponseObject<certificateModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(certificates);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/certificates/revoke`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });
});
