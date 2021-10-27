import { filter } from 'rxjs/operators';
import { Field, FieldType } from './../../models/Field';
import { ResponseObject } from '../../models/helpers/ResponseObject';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import { OrganizationService } from './organization.service';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RecipientModel } from '../recipient/Recipient.model';
import { SignerModel } from '../signer/Signer.model';
import {
  GroupModel, Organization,
} from '../../models/Organization';
import {
  CategoryModel,
  ICategoryFields,
  IdGenerationType
} from '../issuer/category/Category.model';
import { IssuerModel } from '../issuer/Issuer.model';
import { Role } from 'src/app/models/User';
import { IPurchaseHistory } from './models/Admin.model';
import { PackModel } from './models/IssuerOrganization';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let httpTestingController: HttpTestingController;
  const API_ORGANIZATION_URL = `${environment.apiUrl}/organization/`;
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService, HttpClient]
    });
    service = TestBed.inject(OrganizationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('Create organizations group', () => {
    it('makes expected calls', (done) => {
      let admin;
      let org: any;
      let issuer;
      let signer: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuer,
          signers: signer,
          recipients: REs
        }
      ];
      const pack: PackModel = {
        name: 'PackName',
        numberOfCertificates: 10
      };
      const iPurchaseHistories: IPurchaseHistory[] = [
        {
          timestamps: new Date(),
          pack: pack
        }
      ];
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false,
          type: FieldType.date
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
          fields: idCatField
        }
      ];
      let recipients: any = [
        {
          categories: categories,
          groups: Groups
        }
      ];
      const organization: Organization = {
        admin: admin,
        groups: Groups,
        name: 'organization_name',
        pack: pack,
        purchaseHistory: iPurchaseHistories
      };
      const OrganizationGroup: GroupModel = {
        organization: organization.name,
        name: 'groupName',
        issuers: issuer,
        recipients: recipients
      };
      const organizationId = 'organizationId';
      const responseSubject: ResponseObject<GroupModel> = {
        success: true,
        message: 'Organization group created',
        data: OrganizationGroup
      };
      service
        .createOrganizationGroup(organizationId, OrganizationGroup)
        .subscribe((res: ResponseObject<GroupModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(OrganizationGroup);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}/createGroup`
      );
      expect(req.request.method).toBe('POST');
      req.flush(responseSubject);
    });
  });
  describe('remove organizations group', () => {
    it('makes expected calls', (done) => {
      const organizationId = 'organizationId';
      const groupId = 'groupId';
      const responseSubject: ResponseObject<null> = {
        success: true,
        message: 'Organization group deleted',
        data: null
      };
      service
        .removeOrganizationGroup(organizationId, groupId)
        .subscribe((res: ResponseObject<void>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toEqual(null);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}/removeGroup/${groupId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(responseSubject);
    });
  });
  describe('add Issuer To Organization Group', () => {
    it('makes expected calls', (done) => {
      const organizationId = 'organizationID';
      const groupId = 'groupId';
      const issuerId = 'issuerId';
      let org: any;
      let issuers;
      let signer: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuers,
          signers: signer,
          recipients: REs
        }
      ];
      const issuer: IssuerModel = {
        firstname: 'firstName',
        lastname: 'lastName',
        password: 'password',
        birthday: new Date(),
        role: Role.ISSUER,
        address: { country: 'morroco' },
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        },
        groups: Groups
      };
      const responseSubject: ResponseObject<IssuerModel> = {
        success: true,
        message: 'Issuer added to group successfully',
        data: issuer
      };
      service
        .addIssuerToOrganizationGroup(organizationId, groupId, issuerId)
        .subscribe((res: ResponseObject<IssuerModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(issuer);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}/group/${groupId}/addIssuer/${issuerId}`
      );
      expect(req.request.method).toBe('POST');
      req.flush(responseSubject);
    });
  });
  describe('remove Issuer from Organization Group', () => {
    it('makes expected calls', (done) => {
      const organizationId = 'organizationId';
      const groupId = 'grouId';
      const issuerId = 'issuerId';
      let org: any;
      let issuers;
      let signer: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuers,
          signers: signer,
          recipients: REs
        }
      ];
      const issuer: IssuerModel = {
        firstname: 'firstName',
        lastname: 'lastName',
        password: 'password',
        birthday: new Date(),
        role: Role.ISSUER,
        address: { country: 'morroco' },
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        },
        groups: Groups
      };
      const responseSubject: ResponseObject<IssuerModel> = {
        success: true,
        message: 'Issuer removed from group successfully',
        data: issuer
      };
      service
        .removeIssuerFromOrganizationGroup(organizationId, groupId, issuerId)
        .subscribe((res: ResponseObject<IssuerModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(issuer);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}/group/${groupId}/removeIssuer/${issuerId}`
      );
      expect(req.request.method).toBe('DELETE');

      req.flush(responseSubject);
    });
  });
  describe('add Signer To Organization Group', () => {
    it('makes expected calls', (done) => {
      const organizationId = 'organizationId';
      const groupId = 'grouId';
      const signerId = 'signerId';
      let org: any;
      let issuers;
      let signers: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuers,
          signers: signers,
          recipients: REs
        }
      ];
      const signer: SignerModel = {
        firstname: 'firstName',
        lastname: 'lastName',
        password: 'password',
        birthday: new Date(),
        role: Role.ISSUER,
        address: { country: 'morroco' },
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        },
        groups: Groups
      };
      const responseSubject: ResponseObject<SignerModel> = {
        success: true,
        message: 'Signer added to group successfully',
        data: signer
      };
      service
        .addSignerToOrganizationGroup(organizationId, groupId, signerId)
        .subscribe((res: ResponseObject<SignerModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(signer);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}/group/${groupId}/addSigner/${signerId}`
      );
      expect(req.request.method).toBe('POST');
      req.flush(responseSubject);
    });
  });
  describe('remove Signer from Organization Group', () => {
    it('makes expected calls', (done) => {
      const organizationId = 'organizationId';
      const groupId = 'grouId';
      const signerId = 'signerId';
      let org: any;
      let issuers;
      let signers: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuers,
          signers: signers,
          recipients: REs
        }
      ];
      const signer: SignerModel = {
        firstname: 'firstName',
        lastname: 'lastName',
        password: 'password',
        birthday: new Date(),
        role: Role.ISSUER,
        address: { country: 'morroco' },
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        },
        groups: Groups
      };
      const responseSubject: ResponseObject<SignerModel> = {
        success: true,
        message: 'Signer removed from group successfully',
        data: signer
      };
      service
        .removeSignerFromOrganizationGroup(organizationId, groupId, signerId)
        .subscribe((res: any) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(signer);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}'/group/'${groupId}'/removeSigner/'${signerId}`
      );
      expect(req.request.method).toBe('DELETE');

      req.flush(responseSubject);
    });
  });
  describe('add recipient To Organization Group', () => {
    it('makes expected calls', (done) => {
      let organizationId = 'organizationID';
      let groupId = 'groupId';
      let recipientId = 'recipientId';
      let org: any;
      let issuers;
      let signers: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuers,
          signers: signers,
          recipients: REs
        }
      ];
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false,
          type: FieldType.date
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
          fields: idCatField
        }
      ];
      const recipient: RecipientModel = {
        firstname: 'firstName',
        lastname: 'lastName',
        password: 'password',
        birthday: new Date(),
        role: Role.ISSUER,
        address: { country: 'morroco' },
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        },
        categories: categories,
        groups: Groups
      };
      const responseSubject: ResponseObject<SignerModel> = {
        success: true,
        message: 'Recipient added to group successfully',
        data: recipient
      };
      service
        .addRecipientToOrganizationGroup(organizationId, groupId, recipientId)
        .subscribe((res: ResponseObject<RecipientModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(recipient);
          done();
        });
      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}/group/${groupId}/addRecipient/${recipientId}`
      );
      expect(req.request.method).toBe('POST');
      req.flush(responseSubject);
    });
  });
  describe('remove recipient from Organization Group', () => {
    it('makes expected calls', (done) => {
      let organizationId = 'organizationID';
      let groupId = 'groupId';
      let recipientId = 'recipientId';
      let org: any;
      let issuers;
      let signers: any;
      let REs: any;
      let Groups = [
        {
          organization: org,
          name: 'string',
          description: 'string',
          issuers: issuers,
          signers: signers,
          recipients: REs
        }
      ];
      const fields: Field[] = [
        {
          name: 'fieldName',
          isNew: false,
          type: FieldType.date
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
          fields: idCatField
        }
      ];
      const recipient: RecipientModel = {
        firstname: 'firstName',
        lastname: 'lastName',
        password: 'password',
        birthday: new Date(),
        role: Role.ISSUER,
        address: { country: 'morroco' },
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        },
        categories: categories,
        groups: Groups
      };
      const responseSubject: ResponseObject<SignerModel> = {
        success: true,
        message: 'Recipient added to group successfully',
        data: recipient
      };
      service
        .removeRecipientFromOrganizationGroup(
          organizationId,
          groupId,
          recipientId
        )
        .subscribe((res: ResponseObject<RecipientModel>) => {
          expect(res.success).toBeTruthy();
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(recipient);
          done();
        });

      const req = httpTestingController.expectOne(
        `${API_ORGANIZATION_URL}${organizationId}'/group/'${groupId}'/removeRecipient/'${recipientId}`
      );
      expect(req.request.method).toBe('DELETE');

      req.flush(responseSubject);
    });
  });
});
