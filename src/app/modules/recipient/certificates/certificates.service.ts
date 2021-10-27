import { Injectable } from '@angular/core';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { Page } from 'src/app/models/helpers/Page';
const API_Recipient_URL = `${environment.apiUrl}/recipient`;

@Injectable({
  providedIn: 'root'
})
export class ViewCertificatesService {
  cache: Observable<any>[] = [];
  allCachedData: any[] = [];
  filteredData: any[] = [];
  constructor(private http: HttpClient) {}

  getAllRecipientsCertificates(
    page?: number,
    size?: number
  ): Observable<ResponseObject<any>> {
    debugger;
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
    return this.http.get<any>(`${API_Recipient_URL}/certificates`, {
      params: params
    });
  }

  getAllVerifiers(): Observable<any> {
    return this.http.get<any>(`${API_Recipient_URL}/verifiers`);
  }
}
