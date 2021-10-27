import { ResponseObject } from './../../../models/helpers/ResponseObject';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SignerModel } from './../../signer/Signer.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { shareReplay } from 'rxjs/operators';

const API_SIGNER_URL = `${environment.apiUrl}/issuer/signers`;

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  cache: Observable<SignerModel[]>[] = [];
  constructor(private http: HttpClient) {}

  /**
   * Add new Signer
   *
   * @param signer - the new signer
   * @returns Observable<ResponseObject<SignerModel>>
   */

  addSigner(signer: SignerModel): Observable<ResponseObject<SignerModel>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(signer);
    return this.http.post<ResponseObject<SignerModel>>(
      `${API_SIGNER_URL}/`,
      body,
      {
        headers: headers
      }
    );
  }

  /**
   * Get all signers
   *
   * @param page - (optional) the number of pages
   * @param size - (optional) number of signers in a page
   * @param filter - (optional) filter value
   * @param search - (optional) search value
   * @returns Observable<ResponseObject<SignerModel[]>>
   */

  getSigners(
    size: number = 10,
    page: number = 0,
    filter?: string,
    search?: string
  ): Observable<ResponseObject<SignerModel[]>> {
    let returnedData: any;
    let params = new HttpParams();

    if (search) {
      params = params.append('search', search.trim());
    }

    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
    let observable$ = this.http
      .get<SignerModel[]>(`${API_SIGNER_URL}`, {
        params: params
      })
      .pipe(shareReplay(1));

    // First load
    if (this.cache.length === 0) {
      this.cache.push(observable$);
      returnedData = observable$;
    } else {
      if (this.cache.length > page) {
        // Previous
        returnedData = this.cache[page];
      } else {
        // Next
        this.cache.push(observable$);
        returnedData = observable$;
      }
    }
    return returnedData;
  }

  /**
   * Get one signer by Id
   *
   * @param idSigner - the ID of the signer
   * @returns Observable<ResponseObject<SignerModel>>
   */

  findOneSigner(idSigner: string): Observable<SignerModel> {
    return this.http.get<SignerModel>(`${API_SIGNER_URL}/${idSigner}`);
  }

  /**
   * Update Signer by Id
   *
   * @param idSigner - the ID of the signer
   * @param signer - the new signer
   * @returns Observable<ResponseObject<SignerModel>>
   */

  updateSigner(
    idSigner: string,
    signer: SignerModel
  ): Observable<ResponseObject<SignerModel>> {
    return this.http.put<ResponseObject<SignerModel>>(
      `${API_SIGNER_URL}/${idSigner}`,
      signer
    );
  }

  /**
   *Delete one signer by ID
   *
   * @param idSigner - the ID of the signer
   * @returns Observable<ResponseObject<signerModel>>
   */
  deleteSigner(idSigner: string): Observable<ResponseObject<number>> {
    return this.http.delete<ResponseObject<number>>(
      `${API_SIGNER_URL}/${idSigner}`
    );
  }
}
