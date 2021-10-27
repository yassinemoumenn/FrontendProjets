import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { User } from 'src/app/models/User';
import { AuthHTTPService } from './auth-http.service';

describe('AuthHTTPService', () => {
  let service: AuthHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthHTTPService]
    });
    service = TestBed.inject(AuthHTTPService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('createUser', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const UserStub: User = <any>{};
      service.createUser(UserStub).subscribe((res) => {
        expect(res).toEqual(UserStub);
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('POST');
      req.flush(UserStub);
      httpTestingController.verify();
    });
  });

  describe('loginLinkedin', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.loginLinkedin().subscribe((res) => {
        expect(res).toEqual();
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush();
      httpTestingController.verify();
    });
  });

  describe('getUserByToken', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getUserByToken().subscribe((res) => {
        expect(res).toEqual();
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush();
      httpTestingController.verify();
    });
  });
});
