import { Role, IAccountNotification, User } from '../../models/User';
import { TestBed } from '@angular/core/testing';
import { UserProfileService } from './user-profile.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { environment } from '../../../environments/environment';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';

describe('UserProfileService', () => {
  let userProfileService: UserProfileService;
  let httpTestingController: HttpTestingController;

  let User_URL = `${environment.apiUrl}/users`;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService]
    });
    userProfileService = TestBed.inject(UserProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userProfileService).toBeTruthy();
  });

  describe('update the personal information', () => {
    it('should update the personal information', (done) => {
      let user: User = {
        id: 'userID',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@test.com',
        birthday: new Date('1990-10-10'),
        role: Role.ISSUER,
        address: {},
        password: 'password',
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: false,
          passwordResetVerification: false
        }
      };

      let userID = user.id;

      let information = {
        firstname: 'newFirstname',
        lastname: 'newLastname'
      };

      userProfileService.updateUser(userID, information).subscribe((res) => {
        expect(res.success).toBe(true);
        expect(res.data).toBeDefined();
        expect(res.data).toEqual(Object.assign(user, information));
        expect(res).toEqual(response);
        done();
      });

      const response: ResponseObject<User> = {
        success: true,
        message: '',
        data: user
      };

      const req = httpTestingController.expectOne(`${User_URL}/${userID}`);
      expect(req.request.method).toEqual('PUT');
      req.flush(response);
    });
  });

  describe('update the account settings', () => {
    it('should update the account settings', (done) => {
      let user: User = {
        id: 'userID',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@test.com',
        birthday: new Date('1990-10-10'),
        role: Role.ISSUER,
        address: {},
        password: 'password',
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: false,
          passwordResetVerification: false
        }
      };

      let userID = user.id;

      let information = {
        accountSettings: {
          accountNotification: IAccountNotification.SMS,
          twoFactorAuthentication: true,
          passwordResetVerification: false
        }
      };

      userProfileService.updateUser(userID, information).subscribe((res) => {
        expect(res.success).toBe(true);
        expect(res.data).toBeDefined();
        expect(res.data).toEqual(Object.assign(user, information));
        expect(res).toEqual(response);
        done();
      });

      const response: ResponseObject<User> = {
        success: true,
        message: '',
        data: user
      };

      const req = httpTestingController.expectOne(`${User_URL}/${userID}`);
      expect(req.request.method).toEqual('PUT');
      req.flush(response);
    });
  });

  describe('change the password', () => {
    it('should update the password', (done) => {
      let user: User = {
        id: 'userID',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@test.com',
        birthday: new Date('1990-10-10'),
        role: Role.ISSUER,
        address: {},
        password: 'password',
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: false,
          passwordResetVerification: false
        }
      };

      let userID = user.id;

      let information = {
        oldPassword: 'password',
        newPassword: 'newPassword'
      };

      userProfileService
        .changePassword(userID, information)
        .subscribe((res) => {
          expect(res.success).toBe(true);
          expect(res.data).toBeDefined();
          expect(res.data).toEqual(
            Object.assign(user, { password: information.newPassword })
          );
          expect(res).toEqual(response);
          done();
        });

      const response: ResponseObject<User> = {
        success: true,
        message: '',
        data: user
      };

      const req = httpTestingController.expectOne(
        `${User_URL}/changePassword/${userID}`
      );
      expect(req.request.method).toEqual('PUT');
      req.flush(response);
    });

    it('should not update the password because the current password is incorrect', (done) => {
      let user: User = {
        id: 'userID',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email@test.com',
        birthday: new Date('1990-10-10'),
        role: Role.ISSUER,
        address: {},
        password: 'password',
        accountSettings: {
          accountNotification: IAccountNotification.BOTH,
          twoFactorAuthentication: false,
          passwordResetVerification: false
        }
      };

      let userID = user.id;

      let information = {
        oldPassword: 'password',
        newPassword: 'newPassword'
      };

      const data = 'Incorrect Password';
      const err = {
        status: 404,
        statusText: 'Old Password Is Incorrect'
      };

      userProfileService.changePassword(userID, information).subscribe(
        (res) => {},
        (error) => {
          expect(error.status).toEqual(err.status);
          expect(error.statusText).toEqual(err.statusText);
          done();
        }
      );
      const req = httpTestingController.expectOne(
        `${User_URL}/changePassword/${userID}`
      );

      expect(req.request.method).toEqual('PUT');
      req.flush(data, err);
    });
  });
});
