import { HomePage } from './services/services.component';
import { environment } from './../../../environments/environment';
import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import {
  platformBrowserDynamicTesting,
  BrowserDynamicTestingModule
} from '@angular/platform-browser-dynamic/testing';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';

describe('HomeService', () => {
  let homeService: HomeService;
  let httpTestingController: HttpTestingController;

  let Home_URL = `${environment.apiUrl}/home`;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    homeService = TestBed.inject(HomeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(homeService).toBeTruthy();
  });

  describe('get the count of recipients, organizations, certificates, categories', () => {
    it('should get all the counters', (done) => {
      let homePageData: HomePage = new HomePage();
      homePageData.categories = 1;
      homePageData.certificates = 1;
      homePageData.organizations = 1;
      homePageData.recipients = 0;

      homeService.getAllCounters().subscribe((res) => {
        expect(res).toEqual(response.data);
        expect(res.categories).toBeDefined();
        expect(res.certificates).toBeDefined();
        expect(res.organizations).toBeDefined();
        expect(res.recipients).toBeDefined();
        done();
      });

      const response: ResponseObject<HomePage> = {
        success: true,
        message: 'Total count',
        data: homePageData
      };

      const req = httpTestingController.expectOne(`${Home_URL}`);
      expect(req.request.method).toEqual('GET');
      req.flush(response);
    });
  });
});
