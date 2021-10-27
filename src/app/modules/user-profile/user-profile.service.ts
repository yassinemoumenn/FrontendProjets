import { User } from 'src/app/models/User';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IssuerOrganization } from '../Organization/models/IssuerOrganization';
import { Organization } from 'src/app/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  User_URL = `${environment.apiUrl}/users`;
  Organization_URL = `${environment.apiUrl}/IssuerOrganization`;
  API_HYPERLEDGER_URL = `${environment.hyperledgerApi}`;
  TRUFFLE_URL = `${environment.truffleApi}`;

  constructor(private http: HttpClient) { }

  updateUser(id, updates): Observable<ResponseObject<User>> {
    return this.http.put<ResponseObject<User>>(
      `${this.User_URL}/${id}`,
      updates
    );
  }

  /**
   *
   * @param id : id of the user
   * @param passwordBody : body of the passwords containing :
   *  {
   *    oldPassword (the current password),
   *    newPassword (the new password)
   *   }
   */
  changePassword(id, passwordBody): Observable<ResponseObject<User>> {
    return this.http.put<ResponseObject<User>>(
      `${this.User_URL}/changePassword/${id}`,
      passwordBody
    );
  }

  updateOrganization(updates): Observable<ResponseObject<IssuerOrganization | Organization>> {
    return this.http.put<ResponseObject<IssuerOrganization | Organization>>(
      `${this.Organization_URL}/updateOrganization/`,
      updates
    );
  }

  generateBlockChainPublicKey(): Observable<any> {
    return this.http.get(`${this.TRUFFLE_URL}/account/identity`);
  }

  generateBlockchainPrivateIdentity(
    organizationName
  ): Observable<ResponseObject<any>> {
    return this.http.get<ResponseObject<any>>(
      `${this.API_HYPERLEDGER_URL}/account/identity/${organizationName}`
    );
  }
}
