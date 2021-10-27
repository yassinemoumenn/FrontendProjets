import { VerifierModel } from './../../verifier/Verifier.model';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { environment } from '../../../../../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from './Category.model';
import { SignerModel } from '../../signer/Signer.model';
import { IssuerOrganization } from '../../Organization/models/IssuerOrganization';
import { Organization } from 'src/app/models/Organization';

const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
const API_SIGNER_URL = `${environment.apiUrl}/issuer/signers`;
const API_SIGNERORGANIZATION_URL = `${environment.apiUrl}/IssuerOrganization`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  cache: Observable<SignerModel[]>[] = [];
  constructor(private http: HttpClient) {}
  getAllCategories(
    page?: number,
    size?: number
  ): Observable<ResponseObject<CategoryModel[]>> {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }
    return this.http.get<ResponseObject<CategoryModel[]>>(
      `${API_ISSUER_URL}/categories`,
      {
        params: params
      }
    );
  }

  getOrganizationInfo(ID): Observable<VerifierModel[]> {
    return this.http.get<VerifierModel[]>(`${API_ISSUER_URL}/verifiers/${ID}`);
  }

  getAllSigners(id): Observable<any> {
    return this.http.get<any>(`${API_ISSUER_URL}/signers/${id}`);
  }

  getAllVerifiers(id): Observable<any> {
    return this.http.get<any>(`${API_ISSUER_URL}/verifiers`);
  }

  getAllFields(id): Observable<any> {
    return this.http.get<any>(`${API_ISSUER_URL}/fields/${id}`);
  }

  getCurrentOrganization(id): Observable<ResponseObject<Organization>> {
    return this.http.get<ResponseObject<Organization>>(
      `${API_ISSUER_URL}/organizations/${id}`
    );
  }

  getSingleCategory(IdCategory: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      `${API_ISSUER_URL}/categories/${IdCategory}`
    );
  }

  createCategories(
    categories: CategoryModel[]
  ): Observable<ResponseObject<CategoryModel[]>> {
    return this.http.post<ResponseObject<CategoryModel[]>>(
      `${API_ISSUER_URL}/categories`,
      categories
    );
  }

  updateCategory(
    categoryID: string,
    category: CategoryModel
  ): Observable<ResponseObject<CategoryModel>> {
    return this.http.put<ResponseObject<CategoryModel>>(
      `${API_ISSUER_URL}/categories/${categoryID}`,
      category
    );
  }

  updateCategories(
    categories: CategoryModel[]
  ): Observable<ResponseObject<CategoryModel[]>> {
    return this.http.put<ResponseObject<CategoryModel[]>>(
      `${API_ISSUER_URL}/categories`,
      categories
    );
  }

  deleteCategory(categoryID: string): Observable<ResponseObject<number>> {
    return this.http.delete<ResponseObject<number>>(
      `${API_ISSUER_URL}/categories/${categoryID}`
    );
  }

  deleteCategories(categoryID: string[]): Observable<ResponseObject<number>> {
    return this.http.request<ResponseObject<number>>(
      'delete',
      `${API_ISSUER_URL}/categories`,
      {
        body: categoryID
      }
    );
  }
}
