import { RegisterOrganizationResponse } from './../../../models/helpers/RegisterOrganizationResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPhone, User } from 'src/app/models/User';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { Organization } from 'src/app/models/Organization';

const API_AUTH_URL = `${environment.apiUrl}/auth`;
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<ResponseObject<string>> {
    return this.http.post<ResponseObject<string>>(`${API_AUTH_URL}/signin`, {
      email,
      password
    });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_AUTH_URL}/register/user`, user);
  }

  registerOrganization(
    request: any
  ): Observable<ResponseObject<RegisterOrganizationResponse>> {
    return this.http.post<ResponseObject<RegisterOrganizationResponse>>(
      `${API_AUTH_URL}/register/Organization`,
      request
    );
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_AUTH_URL}/forgot-password`, {
      email
    });
  }

  // Get logged in user
  getUserByToken(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/me`);
  }

  // Refresh access token
  refreshToken(): Observable<ResponseObject<string>> {
    return this.http.get<ResponseObject<string>>(
      `${environment.apiUrl}/refresh`
    );
  }

  logout(): Observable<ResponseObject<void>> {
    return this.http.get<ResponseObject<void>>(`${API_AUTH_URL}/logout`);
  }

  sendSignupCodeSms(
    phone: string,
    language: string
  ): Observable<ResponseObject<void>> {
    return this.http.post<ResponseObject<void>>(
      `${API_AUTH_URL}/sendSignupCode`,
      {
        phone: phone,
        language: language
      }
    );
  }
  verifySignUpCodeSms(
    phone: string,
    code: string
  ): Observable<ResponseObject<void>> {
    return this.http.post<ResponseObject<void>>(
      `${API_AUTH_URL}/verifySignUpCode`,
      {
        phone: phone,
        code: code
      }
    );
  }
  sendSignupCodeEmail(email: string): Observable<ResponseObject<void>> {
    return this.http.post<ResponseObject<void>>(
      `${API_AUTH_URL}/sendSignUpCodeViaEmail`,
      {
        email: email
      }
    );
  }
  verifySignUpCodeEmail(
    email: string,
    code: string
  ): Observable<ResponseObject<void>> {
    return this.http.post<ResponseObject<void>>(
      `${API_AUTH_URL}/verifySignUpEmail`,
      {
        email: email,
        code: code
      }
    );
  }
  /**
   * Validate phone on server side, if the phone already taken or not
   * @param phone phone object to validate
   *
   * @returns Observable<any>
   */
  ValidatePhone(phone: IPhone): Observable<any> {
    return this.http.post(`${API_URL}/users/validate/phone`, phone);
  }

  /**
   * Validate email on server side, if the email already taken or not
   * @param email email to validate
   * @returns Observable<any>
   */
  ValidateEmail(email: string): Observable<any> {
    return this.http.post(`${API_URL}/users/validate/email/${email}`, {});
  }

  /**
   * Validate organization name on server side, if the organization name already taken or not
   * @param organizationName organization name to validate
   * @returns Observable<any>
   */
  ValidateOrganizationName(organizationName: string): Observable<any> {
    return this.http.post(`${API_URL}/users/validate/organization`, {
      name: organizationName
    });
  }

  /**
   * Validate username on server side, if the username already taken or not
   * @param email username to validate
   * @returns Observable<any>
   */
  ValidateUsername(username: string): Observable<any> {
    return this.http.post(`${API_URL}/users/validate/username/${username}`, {});
  }
  getCurrentOrganization(): Observable<Organization> {
    return this.http.get<Organization>(
      `${environment.apiUrl}/organization/admin/currentOrganization`
    );
  }
}
