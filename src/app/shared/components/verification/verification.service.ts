import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';
import { environment } from 'src/environments/environment';
const API_CERTIFICATE_URL = `${environment.apiUrl}/certificates`;

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  constructor(private http: HttpClient) {}
  getCertificate(
    certificateID: string
  ): Observable<ResponseObject<certificateModel>> {
    return this.http.get<ResponseObject<certificateModel>>(
      `${API_CERTIFICATE_URL}/certificateID/${certificateID}`
    );
  }
}
