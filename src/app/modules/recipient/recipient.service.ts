import { CategoryModel } from './../issuer/category/Category.model';
import { certificateModel } from './../issuer/certificates/certificate.model';
import { Observable } from 'rxjs';
import { ResponseObject } from '../../models/helpers/ResponseObject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
const API_Recipient_URL = `${environment.apiUrl}/recipient`;
@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  constructor(private http: HttpClient) { }

  /**
   *  Find Certificate By certificateId
   *
   * @param certId - Id of the cerificate
   * @returns Observable<ResponseObject<certificateModel>>
   */
  getCertificate(certId: string): Observable<ResponseObject<certificateModel>> {
    return this.http.get<ResponseObject<certificateModel>>(
      `${API_Recipient_URL}/certificate/${certId}`
    );
  }

  getAllCategories(): Observable<ResponseObject<CategoryModel[]>> {
    return this.http.get<ResponseObject<CategoryModel[]>>(
      `${API_Recipient_URL}/categories`
    );
  }
  ListInvites(): Observable<ResponseObject<any[]>> {
    return this.http.get<ResponseObject<any[]>>(
      `${API_Recipient_URL}/invitations`
    )
  }
  AcceptOrganizationInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${API_Recipient_URL}/invitations/recipientOrg/${grp}/accept`, {})
  }
  RefuseOrganizationInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${API_Recipient_URL}/invitations/recipientOrg/${grp}/refuse`, {})
  }
  AcceptIssuerInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${API_Recipient_URL}/invitations/issuer/${grp}/accept`, {})
  }
  RefuseIssuerInvite(grp: string): Observable<ResponseObject<any[]>> {
    return this.http.put<ResponseObject<any[]>>(
      `${API_Recipient_URL}/invitations/issuer/${grp}/refuse`, {})
  }

}
