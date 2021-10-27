import { certificateModel } from './certificate.model';
import { ResponseObject } from './../../../models/helpers/ResponseObject';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { AuthenticationService } from './../../auth/authentication.service';
import { first } from 'rxjs/internal/operators/first';
import { GroupModel } from 'src/app/models/Organization';
import { IBlockchain } from '../../Organization/models/IssuerOrganization';
const API_CERTIFICATE_URL = `${environment.apiUrl}/certificates`;
const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
const API_HYPERLEDGER_URL = `${environment.hyperledgerApi}`;
const API_ETHEREUM_URL = `${environment.truffleApi}`;
import { EventSourcePolyfill } from 'ng-event-source';
let ISSUER_WATCH = `${API_ISSUER_URL}/certificates/watch`;
@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  //View Certificate Data
  cache: Observable<any>[] = [];
  allCachedData: any[] = [];
  //Issue Certificate Data
  cacheIssue: Observable<any>[] = [];
  allCachedDataIssue: any[] = [];
  eventSource;
  constructor(
    private http: HttpClient,
    private userService: AuthenticationService
  ) {}

  createCertificate(
    certificate: certificateModel
  ): Observable<ResponseObject<certificateModel>> {
    return this.http.post<ResponseObject<certificateModel>>(
      `${API_ISSUER_URL}/certificate`,
      certificate
    );
  }

  public getAllCertificates(
    page?: number,
    size?: number,
    filter?: string,
    search?: string
  ) {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', 0);
      params = params.append('size', 10);
    }
    if (search) {
      params = params.append('search', search.trim());
    }
    if (filter) {
      params = params.append('filter', filter.trim());
    }
    return this.http.get<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/certificates`,
      {
        params: params
      }
    );
  }

  public getAllCertificatesWatch(): Observable<any> {
    // https://www.npmjs.com/package/ng-event-source

    let token = this.userService.token;
    return Observable.create((observer) => {
      this.eventSource = new EventSourcePolyfill(ISSUER_WATCH, {
        headers: {
          Authorization: 'Bearer ' + token
        },
        heartbeatTimeout: 18000000
      });
      this.eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        observer.next(json);
      };
      this.eventSource.onerror = (event) => {
        this.closeWatch().subscribe();
      };
    });
  }

  closeWatch(): Observable<void> {
    this.emptyCache();
    return this.http.get<void>(`${API_ISSUER_URL}/stopCursor`);
  }

  updateCertificate(
    certificateID: string,
    certificate: certificateModel
  ): Observable<ResponseObject<certificateModel>> {
    return this.http.put<ResponseObject<certificateModel>>(
      `${API_CERTIFICATE_URL}/${certificateID}`,
      certificate
    );
  }

  updateCertificates(
    certificates: certificateModel[]
  ): Observable<ResponseObject<certificateModel[]>> {
    return this.http.put<ResponseObject<certificateModel[]>>(
      `${API_CERTIFICATE_URL}/`,
      certificates
    );
  }

  deleteCertificate(certificateID: string): Observable<ResponseObject<number>> {
    return this.http.delete<ResponseObject<number>>(
      `${API_CERTIFICATE_URL}/${certificateID}`
    );
  }

  deleteCertificates(
    certificateIDS: string[]
  ): Observable<ResponseObject<number>> {
    return this.http.request<ResponseObject<number>>(
      'delete',
      `${API_CERTIFICATE_URL}/`,
      {
        body: certificateIDS
      }
    );
  }

  revokeCertificate(
    certificateID: string,
    reason: string
  ): Observable<ResponseObject<certificateModel>> {
    return this.http.put<ResponseObject<certificateModel>>(
      `${API_ISSUER_URL}/certificates/${certificateID}/revoke`,
      { revokedReason: reason }
    );
  }

  revokeCertificates(
    certificatesIDs: string[]
  ): Observable<ResponseObject<certificateModel[]>> {
    return this.http.put<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/certificates/revoke`,
      { certificatesIDs }
    );
  }
  /**
   * Get all certificate, we use also this method to call search and filter.
   *
   * @param pageSize - Required page size
   * @param pageIndex - Required page index
   * @param certificates$ - certificate data
   * @returns Observable<any>
   */
  getAllCertificate(
    page: number = 0,
    size?: number,
    filter?: string,
    search?: string
  ): Observable<any> {
    let returnedData: any;
    let params = new HttpParams();

    ISSUER_WATCH = `${API_ISSUER_URL}/certificates/watch`;

    if (page !== undefined && size !== undefined) {
      ISSUER_WATCH += '?page=0&size=10';
      params = params.append('page', 0);
      params = params.append('size', 10);
    }
    if (search) {
      params = params.append('search', search.trim());
      if (ISSUER_WATCH.endsWith('watch'))
        ISSUER_WATCH += '?search=' + search.trim();
      else ISSUER_WATCH += '&search=' + search.trim();
    }
    if (filter) {
      params = params.append('filter', filter.trim());

      if (ISSUER_WATCH.endsWith('watch'))
        ISSUER_WATCH += '?filter=' + filter.trim();
      else ISSUER_WATCH += '&filter=' + filter.trim();
    }

    let certificatesData$ = this.http.get<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/certificates`,
      {
        params: params
      }
    );

    // First load
    if (this.cache.length === 0) {
      this.cache.push(certificatesData$);
      returnedData = certificatesData$;
    } else {
      if (this.cache.length > page) {
        // Previous
        returnedData = this.cache[page];
      } else {
        // Next
        this.cache.push(certificatesData$);
        returnedData = certificatesData$;
      }
    }
    this.allCachedData = this.GetAllCachedData();
    return returnedData;
  }

  emptyCache() {
    this.cache = [];
    this.cacheIssue = [];
    this.allCachedData = [];
    this.allCachedDataIssue = [];
  }
  /**
   * Get all certificate, we use also this method to call search and filter.
   *
   * @param pageSize - Required page size
   * @param pageIndex - Required page index
   * @param certificates$ - certificate data
   * @returns Observable<any>
   */
  getAllSignedCertificate(
    page: number = 0,
    size?: number,
    filter?: string,
    search?: string
  ): Observable<any> {
    let returnedData: any;
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', 0);
      params = params.append('size', 10);
    }
    if (search) {
      params = params.append('search', search.trim());
    }
    if (filter) {
      params = params.append('filter', filter.trim());
    }
    let certificatesData$ = this.http.get<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/SignedCertificates`,
      {
        params: params
      }
    );

    // First load
    if (this.cacheIssue.length === 0) {
      this.cacheIssue.push(certificatesData$);
      returnedData = certificatesData$;
    } else {
      if (this.cacheIssue.length > page) {
        // Previous
        returnedData = this.cacheIssue[page];
      } else {
        // Next
        this.cacheIssue.push(certificatesData$);
        returnedData = certificatesData$;
      }
    }
    this.allCachedDataIssue = this.GetAllCachedData('issue');
    return returnedData;
  }

  /**
   * Get all cached items
   *
   * @returns any[]
   */
  GetAllCachedData(element: string = 'certificate'): any[] {
    if ((element = 'certificate')) {
      forkJoin(this.cache).subscribe((res) => {
        this.allCachedData = [].concat.apply([], res);
      });
      return this.allCachedData;
    } else {
      forkJoin(this.cacheIssue).subscribe((res) => {
        this.allCachedDataIssue = [].concat.apply([], res);
      });
      return this.allCachedDataIssue;
    }
  }

  getCurrentIssuer() {
    return this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user));
  }

  issuePrivateCertificateHyperledger(hyperledgerBody) {
    return this.http.post(
      `${API_HYPERLEDGER_URL}/AddCertificate`,
      hyperledgerBody
    );
  }

  issueCertificateMongo(
    certificatesBlockchainInformation
  ): Observable<ResponseObject<certificateModel[]>> {
    return this.http.put<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/certificates/issue`,
      certificatesBlockchainInformation
    );
  }
  issuePublicCertificateEthereum(ethereumBody) {
    return this.http.post(
      `${API_ETHEREUM_URL}/certificate/generate`,
      ethereumBody
    );
  }

  generateCertificateCertIDs(
    certificateIDs: string[]
  ): Observable<ResponseObject<certificateModel[]>> {
    return this.http.put<ResponseObject<certificateModel[]>>(
      `${API_ISSUER_URL}/certificates/generateIDs`,
      certificateIDs
    );
  }
  getCertificateFromHyperledger(certificateID: string) {
    return this.http.get(`${API_HYPERLEDGER_URL}/certificate/${certificateID}`);
  }
  getCurrentGroup(): Observable<ResponseObject<GroupModel>> {
    return this.http.get<ResponseObject<GroupModel>>(
      `${API_ISSUER_URL}/CurrentGroup`
    );
  }

  getCurrentBlockchainIdentity(): Observable<ResponseObject<IBlockchain>> {
    return this.http.get<ResponseObject<IBlockchain>>(
      `${API_ISSUER_URL}/identity`
    );
  }
  uploadMultipleCertificates(
    data: File,
    categoryId: string,
    designId: string
  ): Observable<ResponseObject<void>> {
    return this.http.post<ResponseObject<void>>(
      `${API_ISSUER_URL}/certificates/upload/${categoryId}/${designId}`,
      { file: data }
    );
  }
}
