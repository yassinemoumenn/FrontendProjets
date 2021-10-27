import { Observable } from 'rxjs';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';

@Injectable()
export class VerifierService {
  constructor(private http: HttpClient) {}
  API_VERIFIER_URL = `${environment.apiUrl}/verifier`;

  getVerifierGroups(): Observable<ResponseObject<string[]>> {
    return this.http.get<ResponseObject<string[]>>(
      `${this.API_VERIFIER_URL}/groups`
    );
  }

  getCertificates(): Observable<ResponseObject<certificateModel[]>> {
    return this.http.get<ResponseObject<certificateModel[]>>(
      `${this.API_VERIFIER_URL}/certificates`
    );
  }
  ListInvites(): Observable<ResponseObject<any[]>> {
    return this.http.get<ResponseObject<any[]>>(
      `${this.API_VERIFIER_URL}/invitations`
    );
  }
  AcceptOrganizationInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${this.API_VERIFIER_URL}/invitations/verifierOrg/${grp}/accept`,
      {}
    );
  }
  RefuseOrganizationInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${this.API_VERIFIER_URL}/invitations/verifierOrg/${grp}/refuse`,
      {}
    );
  }
  AcceptIssuerInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${this.API_VERIFIER_URL}/invitations/issuer/${grp}/accept`,
      {}
    );
  }
  RefuseIssuerInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${this.API_VERIFIER_URL}/invitations/issuer/${grp}/refuse`,
      {}
    );
  }
}
