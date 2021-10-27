import { IAffiliation } from './../../../models/User';
import { IssuerModel } from './../Issuer.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { Organization } from 'src/app/models/Organization';
import { IssuerOrganization } from '../../Organization/models/IssuerOrganization';

const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  constructor(private http: HttpClient) {}

  sendRequest(organization: IAffiliation): any {
    return this.http.put<ResponseObject<IssuerModel>>(
      `${API_ISSUER_URL}/RequestOrganization`,
      organization
    );
  }

  getOrganizations(): Observable<ResponseObject<Organization[]>> {
    return this.http.get<ResponseObject<Organization[]>>(
      `${API_ISSUER_URL}/organizations`
    );
  }

  ListOrganizationNonDoesNotBelongToCurrentIssuer(): Observable<
    ResponseObject<IssuerOrganization[]>
  > {
    return this.http.get<ResponseObject<IssuerOrganization[]>>(
      `${API_ISSUER_URL}/NonAffectedIssuerOrganizations`
    );
  }
  ListOrganizationInvites(): Observable<ResponseObject<IAffiliation[]>> {
    return this.http.get<ResponseObject<IAffiliation[]>>(
      `${API_ISSUER_URL}/invitations`
    );
  }
  AcceptOrganizationInvite(
    grp: string
  ): Observable<ResponseObject<IAffiliation[]>> {
    return this.http.put<ResponseObject<IAffiliation[]>>(
      `${API_ISSUER_URL}/invitations/accept/${grp}`,
      {}
    );
  }
  RefuseOrganizationInvite(
    grp: string
  ): Observable<ResponseObject<IAffiliation[]>> {
    return this.http.put<ResponseObject<IAffiliation[]>>(
      `${API_ISSUER_URL}/invitations/refuse/${grp}`,
      {}
    );
  }
}
