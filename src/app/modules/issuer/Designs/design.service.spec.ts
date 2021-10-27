import { MatDialog } from '@angular/material/dialog';
import { ResponseObject } from './../../../models/helpers/ResponseObject';
import { DesignService } from './design.service';
import { DesignModel } from './Design.model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { environment } from '../../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';

describe('DesignService', () => {
  let service: DesignService;
  let httpTestingController: HttpTestingController;
  const API_DESIGN_URL = `${environment.apiUrl}/design`;
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
        DesignService,
        HttpClient,
        { provide: MatDialog, useValue: {} }
      ]
    });
    service = TestBed.inject(DesignService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('Create Design', () => {
    it('makes expected calls', (done) => {
      const designs: DesignModel[] = [
        {
          user_id: 'user',
          name: 'DesignName1',
          category: 'catName1',
          template: 'template',
          shape: Shape.CARD,
          isUsed: false
        }
      ];
      const responseSubject: ResponseObject<DesignModel[]> = {
        success: true,
        message: 'Design created successfully',
        data: designs
      };
      service
        .createDesign(designs)
        .subscribe((res: ResponseObject<DesignModel[]>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(designs);
          done();
        });
      const req = httpTestingController.expectOne(`${API_DESIGN_URL}/`);
      expect(req.request.method).toBe('POST');
      req.flush(responseSubject);
    });
  });
  describe('update Design', () => {
    it('makes expected calls', (done) => {
      const designID = 'designId';
      const design: DesignModel = {
        user_id: 'user',
        name: 'DesignName1',
        category: 'catName1',
        template: 'template',
        shape: Shape.CARD,
        isUsed: false
      };
      const responseSubject: ResponseObject<DesignModel> = {
        success: true,
        message: 'Design updated successfully',
        data: design
      };
      service
        .updateDesign(designID, design)
        .subscribe((res: ResponseObject<DesignModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(design);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_DESIGN_URL}/${designID}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(responseSubject);
    });
  });
  describe('update Designs', () => {
    it('makes expected calls', (done) => {
      const designs: DesignModel[] = [
        {
          user_id: 'user',
          name: 'DesignName1',
          category: 'catName1',
          template: 'template',
          shape: Shape.CARD,
          isUsed: false
        }
      ];
      const responseSubject: ResponseObject<DesignModel[]> = {
        success: true,
        message: 'Design updated successfully',
        data: designs
      };
      service
        .updateDesigns(designs)
        .subscribe((res: ResponseObject<DesignModel[]>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(designs);
          done();
        });
      const req = httpTestingController.expectOne(`${API_DESIGN_URL}/`);
      expect(req.request.method).toBe('PUT');
      req.flush(responseSubject);
    });
  });
  describe('delete Designs', () => {
    it('makes expected calls', (done) => {
      const designID: string[] = ['designId1', 'designId2'];
      const responseSubject: ResponseObject<number> = {
        success: true,
        message: 'Counter of deleted designs',
        data: designID.length
      };
      service
        .deleteDesigns(designID)
        .subscribe((res: ResponseObject<number>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(designID.length);
          done();
        });
      const req = httpTestingController.expectOne(`${API_DESIGN_URL}/`);
      expect(req.request.method).toBe('DELETE');
      req.flush(responseSubject);
    });
  });
  describe('get Design', () => {
    it('makes expected calls', (done) => {
      const designID = 'designId1';
      const design: DesignModel = {
        user_id: 'user',
        name: 'DesignName1',
        category: 'catName1',
        template: 'template',
        shape: Shape.CARD,
        isUsed: false
      };
      const responseSubject: ResponseObject<DesignModel> = {
        success: true,
        message: 'Design data',
        data: design
      };
      service
        .getDesign(designID)
        .subscribe((res: ResponseObject<DesignModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(design);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_DESIGN_URL}/${designID}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(responseSubject);
    });
  });
  describe('get Design By Category ID', () => {
    it('makes expected calls', (done) => {
      const categoryID = 'categoryId';
      const designs: DesignModel[] = [
        {
          user_id: 'user',
          name: 'DesignName1',
          category: 'catName1',
          template: 'template',
          shape: Shape.CARD,
          isUsed: false
        }
      ];
      const responseSubject: ResponseObject<DesignModel[]> = {
        success: true,
        message: 'Design data',
        data: designs
      };
      service
        .getDesignByCategoryID(categoryID)
        .subscribe((res: ResponseObject<DesignModel[]>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(designs);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_DESIGN_URL}/findbycategory/${categoryID}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(responseSubject);
    });
  });
});
