import { certificateModel } from './../../issuer/certificates/certificate.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, delay, shareReplay } from 'rxjs/operators';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../auth/authentication.service';

const API_ISSUER_URL = `${environment.apiUrl}/signer`;
@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  cache: Observable<any>[] = [];
  allCachedData: any[] = [];
  filteredData: any[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Get certificates, we use also this method to call search, filter and sort.
   *
   * @param pageSize - Required page size
   * @param pageIndex - Required page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @param sort - Optional value used in the sort
   * @returns Observable<any>
   */
  getCertificates(
    pageSize?: number,
    pageIndex: number = 0,
    filter?: string,
    search?: string,
    sort?: Sort
  ): Observable<ResponseObject<any>> {
    let returnedData: any;
    let observable$: any;
    let params = new HttpParams();
    if (pageSize) {
      params = new HttpParams({
        fromObject: {
          page: pageIndex + 1,
          size: pageSize
        }
      });
    }

    if (filter && filter.trim().toLowerCase() !== 'all') {
      if (filter?.trim().toLocaleLowerCase() === 'signed') {
        observable$ = this.getSignedCertificates();
      }
      if (filter?.trim().toLocaleLowerCase() === 'created') {
        observable$ = this.getNonSignedCertificates();
      }
    } else {
      let observableNonSignedCerts$ = this.getNonSignedCertificates().pipe(
        shareReplay(1)
      );

      let observableSignedCerts$ = this.getSignedCertificates().pipe(
        shareReplay(1)
      );

      observable$ = forkJoin([
        observableNonSignedCerts$,
        observableSignedCerts$
      ]);
    }

    // First load
    if (this.cache.length === 0) {
      this.cache.push(observable$);
      returnedData = observable$;
    } else {
      if (this.cache.length > pageIndex) {
        // Previous
        returnedData = this.cache[pageIndex];
      } else {
        // Next
        this.cache.push(observable$);
        returnedData = observable$;
      }
    }

    return returnedData;
  }

  getAllCertificates(pageSize?: number, pageIndex: number = 0) {
    let params = new HttpParams();
    if (pageSize) {
      params = new HttpParams({
        fromObject: {
          page: pageIndex + 1,
          size: pageSize
        }
      });
    }

    return this.http.get<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/certificates`,
      {
        params: params
      }
    );
  }
  /**
   * Sign certificate
   *
   * @param certificateID
   * @returns Observable<ResponseObject<any>>
   */
  signCertificate(certificateID: string): Observable<ResponseObject<any>> {
    return this.http.put<ResponseObject<any>>(
      `${API_ISSUER_URL}/certificates/${certificateID}/sign`,
      null
    );
  }

  /**
   * Sign multiple certificates
   *
   * @param certificateID
   * @returns
   */
  signMultipleCertificates(
    certificateID: string[]
  ): Observable<ResponseObject<any>> {
    return this.http.put<ResponseObject<any>>(
      `${API_ISSUER_URL}/certificates/sign`,
      certificateID
    );
  }

  /**
   * Usign certificate
   *
   * @param certificateID
   * @returns Observable<ResponseObject<any>>
   */
  unSignCertificate(certificateID: string): Observable<ResponseObject<any>> {
    return this.http.put<ResponseObject<any>>(
      `${API_ISSUER_URL}/unsign/${certificateID}`,
      certificateID
    );
  }

  /**
   * Usign multiple certificates
   *
   * @param certificateID
   * @returns Observable<ResponseObject<any>>
   */
  unSignMultipleCertificates(
    certificateID: string[]
  ): Observable<ResponseObject<any>> {
    return this.http.put<ResponseObject<any>>(
      `${API_ISSUER_URL}/unsign`,
      certificateID
    );
  }
  /**
   * Reject certificate
   *
   * @param certificateID
   * @param reason
   * @returns Observable<ResponseObject<any>>
   */
  rejectCertificate(
    certificateID: string,
    reason: string
  ): Observable<ResponseObject<certificateModel>> {
    return this.http.put<ResponseObject<certificateModel>>(
      `${API_ISSUER_URL}/${certificateID}/reject`,
      { reason: reason }
    );
  }
  /**
   * Get all signed certificates
   *
   * @returns Observable<ResponseObject<any>>
   */
  getSignedCertificates(): Observable<ResponseObject<any>> {
    return this.http.get<ResponseObject<any>>(
      `${API_ISSUER_URL}/SignedCertificates`
    );
  }

  /**
   * Get all unsigned certificates
   *
   * @returns Observable<ResponseObject<any>>
   */
  getNonSignedCertificates(): Observable<ResponseObject<any>> {
    return this.http.get<ResponseObject<any>>(
      `${API_ISSUER_URL}/NonSignedCertificates`
    );
  }
}
