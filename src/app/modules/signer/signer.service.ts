import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { certificateModel } from '../issuer/certificates/certificate.model';

const API_SIGNER_URL = `${environment.apiUrl}/signer`;
@Injectable({
  providedIn: 'root'
})
export class SignerService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param param the optional number of page and size
   * @returns  resturn an observable <ResponseObject<certificateModel[]>>
   * to get back a list of certificates you should use:
   * (responseObject)=>{lisofcertificates=responseObject.data} when you subscribe
   *
   */
  public bringAllCertificates(
    page?: number,
    size?: number
  ): Observable<ResponseObject<certificateModel[]>> {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }

    return this.http.get<ResponseObject<certificateModel[]>>(
      API_SIGNER_URL + '/certificates',
      {
        params: params
      }
    );
  }

  public saveSignedCertificateById(
    certificate: certificateModel
  ): Observable<ResponseObject<certificateModel>> {
    return this.http.put<ResponseObject<certificateModel>>(
      API_SIGNER_URL + '/certificates/' + certificate.id + '/sign',
      certificate
    );
  }

  /**
   *
   * @param signedCerticates  list of signed certificates
   * @returns  ResponseObject after registering that list of certificates in the backend
   */
  public saveSignedCertificateslist(
    signedCerticates: certificateModel[]
  ): Observable<ResponseObject<certificateModel[]>> {
    let signedCerticatesIDs = signedCerticates.map((signedcid) => signedcid.id);
    return this.http.put<ResponseObject<certificateModel[]>>(
      API_SIGNER_URL + '/certificates/sign',
      signedCerticatesIDs
    );
  }

  /**
   *
   * @returns  collection of a not signed certificate as an ResponseObject.data from the backend
   */
  public bringNotSignedCertificates(): Observable<
    ResponseObject<certificateModel[]>
  > {
    return this.http.get<ResponseObject<certificateModel[]>>(
      API_SIGNER_URL + '/NonSignedCertificates'
    );
  }

  public bringAllSignedCertificates(): Observable<
    ResponseObject<certificateModel[]>
  > {
    return this.http.get<ResponseObject<certificateModel[]>>(
      API_SIGNER_URL + '/SignedCertificates'
    );
  }
}
