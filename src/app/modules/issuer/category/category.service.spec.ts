import { ResponseObject } from '../../../../../src/app/models/helpers/ResponseObject';
import { Field } from '../../../../../src/app/models/Field';
import {
  CategoryModel,
  ICategoryFields,
  IdGenerationType
} from './Category.model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { environment } from './../../../../../src/environments/environment';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClient } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;
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
      providers: [CategoryService, HttpClient]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('Get category', () => {
    it('makes expected calls', (done) => {
      const IdCategory = 'IdCategory';
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const category: CategoryModel = {
        name: 'category_name',
        issuer: 'issuer',
        idGenerationType: IdGenerationType.AUTOMATIC,
        categoryFields: idCatField
      };
      service.getSingleCategory(IdCategory).subscribe((res: CategoryModel) => {
        expect(res).toBeDefined();
        expect(res).toEqual(category);
        done();
      });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/${IdCategory}`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(category);
    });
  });
  describe('Get ALL categories', () => {
    it('makes expected calls', (done) => {
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const categories: CategoryModel[] = [
        {
          name: 'category_name',
          issuer: 'issuer',
          idGenerationType: IdGenerationType.AUTOMATIC,
          categoryFields: idCatField
        }
      ];
      const responseObject: ResponseObject<CategoryModel[]> = {
        success: true,
        message: 'Category data',
        data: categories
      };
      service
        .getAllCategories(3, 5)
        .subscribe((res: ResponseObject<CategoryModel[]>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(categories);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/categories?page=3&size=5`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(responseObject);
    });
  });

  describe('create Categories', () => {
    it('makes expected calls', (done) => {
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const categories: CategoryModel[] = [
        {
          name: 'category_name',
          issuer: 'issuer',
          idGenerationType: IdGenerationType.AUTOMATIC,
          categoryFields: idCatField
        }
      ];
      const responseObject: ResponseObject<CategoryModel[]> = {
        success: true,
        message: 'Categories created successfully',
        data: categories
      };
      service
        .createCategories(categories)
        .subscribe((res: ResponseObject<CategoryModel[]>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(categories);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/categories`
      );

      expect(req.request.method).toEqual('POST');
      req.flush(responseObject);
    });
  });

  describe('create Category', () => {
    it('makes expected calls', (done) => {
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const category: CategoryModel = {
        name: 'category_name',
        issuer: 'issuer',
        idGenerationType: IdGenerationType.AUTOMATIC,
        categoryFields: idCatField
      };
      const responseObject: ResponseObject<CategoryModel> = {
        success: true,
        message: 'Category created successfully',
        data: category
      };
      service
        .createCategory(category)
        .subscribe((res: ResponseObject<CategoryModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(category);
          done();
        });

      const req = httpTestingController.expectOne(`${API_ISSUER_URL}/category`);

      expect(req.request.method).toEqual('POST');
      req.flush(responseObject);
    });
  });

  describe('update Category', () => {
    it('makes expected calls', (done) => {
      const categoryID = 'categoryID';
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const category: CategoryModel = {
        name: 'category_name',
        issuer: 'issuer',
        idGenerationType: IdGenerationType.AUTOMATIC,
        categoryFields: idCatField
      };
      const responseObject: ResponseObject<CategoryModel> = {
        success: true,
        message: 'Category updated successfully',
        data: category
      };

      service
        .updateCategory(categoryID, category)
        .subscribe((res: ResponseObject<CategoryModel>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(category);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/categories/${categoryID}`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });

  describe('update Categories', () => {
    it('makes expected calls', (done) => {
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const categories: CategoryModel[] = [
        {
          name: 'category_name',
          issuer: 'issuer',
          idGenerationType: IdGenerationType.AUTOMATIC,
          categoryFields: idCatField
        }
      ];
      const responseObject: ResponseObject<CategoryModel[]> = {
        success: true,
        message: 'Categories updated successfully',
        data: categories
      };

      service
        .updateCategories(categories)
        .subscribe((res: ResponseObject<CategoryModel[]>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(categories);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/categories`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(responseObject);
    });
  });

  describe('Delete category', () => {
    it('makes expected calls', (done) => {
      const categoryID = 'categoryID';
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const category: CategoryModel = {
        name: 'category_name',
        issuer: 'issuer',
        idGenerationType: IdGenerationType.AUTOMATIC,
        categoryFields: idCatField
      };
      const responseObject: ResponseObject<CategoryModel> = {
        success: true,
        message: 'Counter of deleted category',
        data: category
      };

      service
        .deleteCategory(categoryID)
        .subscribe((res: ResponseObject<number>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/categories/${categoryID}`
      );

      expect(req.request.method).toEqual('DELETE');
      req.flush(responseObject);
    });
  });

  describe('Delete Certificates', () => {
    it('makes expected calls', (done) => {
      const categoryID: string[] = [
        'categoryID_ID1',
        'categoryID_ID2',
        'categoryID_ID3'
      ];

      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false
        }
      ];
      const idCatField: ICategoryFields = {
        recipient: fields,
        certificate: fields
      };

      const category: CategoryModel = {
        name: 'category_name',
        issuer: 'issuer',
        idGenerationType: IdGenerationType.AUTOMATIC,
        categoryFields: idCatField
      };
      const responseObject: ResponseObject<CategoryModel> = {
        success: true,
        message: 'Counter of deleted category',
        data: category
      };
      service
        .deleteCategories(categoryID)
        .subscribe((res: ResponseObject<number>) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ISSUER_URL}/categories`
      );

      expect(req.request.method).toEqual('DELETE');
      req.flush(responseObject);
    });
  });
});
