import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClient } from '@angular/common/http';
import { SignerService } from './signer.service';

import { environment } from '../../../environments/environment';
import {
  certificateModel,
  CertificateStatus,
  ICertificateState
} from '../issuer/certificates/certificate.model';

describe('SignerService', () => {
  let service: SignerService;
  let httpMock: HttpTestingController;
  let baseUrl = environment.apiUrl;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignerService, HttpClient]
    });
    service = TestBed.inject(SignerService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#bringAllCertificates', () => {
    it('should return an Observable<ResponseSubject<certificateModel[]>> ', () => {
      const state: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };
      const certificates: certificateModel[] = [
        {
          category: 'academic certificate',
          issuer: 'fsdm',
          recipient: 'benjadi rida',
          design: 'design ref folder directory',
          state: state
        },
        {
          category: 'academic certificate',
          issuer: 'est',
          recipient: 'hossin',
          design: 'design acdemic design',
          state: state
        }
      ];

      service.bringAllCertificates(1, 5).subscribe((resp) => {
        expect(resp.data).toEqual(certificates);
      });

      const req = httpMock.expectOne(
        baseUrl + '/signer/certificates?page=1&size=5'
      );
      expect(req.request.method).toBe('GET');
      req.flush(certificates);
    });

    it('parametter are not specified and  return Observable<ResponseSubject<certificateModel[]>>', () => {
      const state: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };
      const certificates: certificateModel[] = [
        {
          category: 'academic certificate',
          issuer: 'fsdm',
          recipient: 'benjadi rida',
          design: 'design ref folder directory',
          state: state
        },
        {
          category: 'academic certificate',
          issuer: 'est',
          recipient: 'hossin',
          design: 'design acdemic design',
          state: state
        }
      ];

      service.bringAllCertificates().subscribe((resp) => {
        expect(resp.data).toEqual(certificates);
      });

      const req = httpMock.expectOne(baseUrl + '/signer/certificates');
      expect(req.request.method).toBe('GET');
      req.flush(certificates);
    });
  });

  describe('#saveSignedCertificateById', () => {
    it('should return an Observable<ResponseSubject<certificateModel>> ', () => {
      const state: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };
      const certObj: certificateModel = {
        id: '111847',
        category: 'academic certificate',
        issuer: 'fsdm',
        recipient: 'mohammed amine',
        design: 'design ref folder directory',
        state: state
      };

      const certificate1 = new certificateModel(certObj);

      service.saveSignedCertificateById(certificate1).subscribe((resp) => {
        expect(resp.data).toEqual(certificate1);
      });

      const req = httpMock.expectOne(
        baseUrl + '/signer/certificates/' + certificate1.id + '/sign'
      );
      expect(req.request.method).toBe('PUT');
      req.flush(certificate1);
    });
  });

  describe('#saveSignedCertificateslist', () => {
    it('should return an Observable<ResponseSubject<certificateModel[]>> ', () => {
      const state: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };
      const certificates: certificateModel[] = [
        {
          category: 'academic certificate',
          issuer: 'fsdm',
          recipient: 'benjadi rida',
          design: 'design ref folder directory',
          state: state
        },
        {
          category: 'academic certificate',
          issuer: 'est',
          recipient: 'hossin',
          design: 'design acdemic design',
          state: state
        }
      ];
      service.saveSignedCertificateslist(certificates).subscribe((resp) => {
        expect(resp.data).toBe(certificates);
      });

      const req = httpMock.expectOne(baseUrl + '/signer/certificates/sign');
      expect(req.request.method).toBe('PUT');
      req.flush(certificates);
    });
  });

  describe('#bringNotSignedCertificate()', () => {
    it('should return an Observable<ResponseSubject<certificateModel[]>> ', () => {
      const state: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };
      const certificates: certificateModel[] = [
        {
          category: 'academic certificate',
          issuer: 'fsdm',
          recipient: 'benjadi rida',
          design: 'design ref folder directory',
          state: state
        },
        {
          category: 'academic certificate',
          issuer: 'est',
          recipient: 'hossin',
          design: 'design acdemic design',
          state: state
        }
      ];
      service.bringNotSignedCertificates().subscribe((resp) => {
        expect(resp.data).toBe(certificates);
      });
      const req = httpMock.expectOne(baseUrl + '/signer/NonSignedCertificates');
      expect(req.request.method).toBe('GET');
      req.flush(certificates);
    });
  });

  describe('#bringAllSignedCertificates()', () => {
    it('should return an Observable<ResponseSubject<certificateModel[]>> ', () => {
      const state: ICertificateState = {
        createdAt: new Date(),
        status: CertificateStatus.CREATED
      };
      const certificates: certificateModel[] = [
        {
          category: 'academic certificate',
          issuer: 'fsdm',
          recipient: 'benjadi rida',
          design: 'design ref folder directory',
          state: state
        },
        {
          category: 'academic certificate',
          issuer: 'est',
          recipient: 'hossin',
          design: 'design acdemic design',
          state: state
        }
      ];
      service.bringAllSignedCertificates().subscribe((resp) => {
        expect(resp.data).toBe(certificates);
      });
      const req = httpMock.expectOne(baseUrl + '/signer/SignedCertificates');
      expect(req.request.method).toBe('GET');
      req.flush(certificates);
    });
  });
});
