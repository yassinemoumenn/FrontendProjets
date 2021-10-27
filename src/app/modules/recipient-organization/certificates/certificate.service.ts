import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { environment } from 'src/environments/environment';
import { certificateModel } from '../../issuer/certificates/certificate.model';

const API_RECIPIENT_ORGANIZATION_URL = `${environment.apiUrl}/RecipientOrganization`;
@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getAllCertificates(
    page?: number,
    size?: number
  ): Observable<ResponseObject<certificateModel[]>> {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
    return this.http.get<ResponseObject<certificateModel[]>>(
      `${API_RECIPIENT_ORGANIZATION_URL}/certificates`,
      {
        params: params
      }
    );
  }
}
