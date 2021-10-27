import { RecipientModel } from './../Recipient.model';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { CategoryModel } from './../../issuer/category/Category.model';
import { Field, FieldType } from 'src/app/models/Field';
import { Injectable } from '@angular/core';
import { GroupModel, Organization } from 'src/app/models/Organization';
import { IssuerOrganization } from '../../Organization/models/IssuerOrganization';
import { RecipientOrganization } from '../../Organization/models/RecipientOrganization';

const API_ORGANIZATION_URL = `${environment.apiUrl}/organizations`;
const API_URL = `${environment.apiUrl}`;
const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
const API_RECIPIENT_URL = `${environment.apiUrl}/recipient`;
@Injectable({
  providedIn: 'root'
})
export class ListingOrganizationssService {
  constructor(private http: HttpClient) {}

  sendRequestToIssuerOrganization(org) {}

  sendRequestToRecipientOrganization(
    org
  ): Observable<ResponseObject<RecipientModel[]>> {
    return this.http.put<ResponseObject<RecipientModel[]>>(
      `${API_RECIPIENT_URL}/RequestRecipientOrganization`,
      { org }
    );
  }

  GetCatergoryBygroupID(idGroup): Observable<ResponseObject<CategoryModel[]>> {
    return this.http.get<ResponseObject<CategoryModel[]>>(
      `${API_RECIPIENT_URL}/${idGroup}/categories`
    );
  }
  GetRecipientOrganizations(): Observable<
    ResponseObject<RecipientOrganization[]>
  > {
    return this.http.get<ResponseObject<RecipientOrganization[]>>(
      `${API_RECIPIENT_URL}/recipients/RecipientOrganizations`
    );
  }

  GetIssuerOrganizations(): Observable<ResponseObject<IssuerOrganization[]>> {
    return this.http.get<ResponseObject<IssuerOrganization[]>>(
      `${API_RECIPIENT_URL}/IssuerOrganizations`
    );
  }

  ListOrganization(): Observable<ResponseObject<Organization[]>> {
    return this.http.get<ResponseObject<Organization[]>>(
      `${API_ORGANIZATION_URL}/`
    );
  }

  ListOrganizationAndItsGroups(
    organization: string
  ): Observable<ResponseObject<GroupModel[]>> {
    return this.http.get<ResponseObject<GroupModel[]>>(
      `${API_ORGANIZATION_URL}/${organization}`
    );
  }

  AllCategoriesByGroup(
    id: string
  ): Observable<ResponseObject<CategoryModel[]>> {
    return this.http.get<ResponseObject<CategoryModel[]>>(
      `${API_URL}/organization/groups/${id}/categories/`
    );
  }
  sendRequest(
    organization: Organization,
    group: GroupModel,
    categories: CategoryModel[]
  ) {}
  fieldRecipient: Field = new Field({
    name: 'comment',
    type: FieldType.text,
    value: '',
    new: true
  });

  getCategoriesPgonation(orgs: Organization[], pageIndex, pageSize): any {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = orgs[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return of(ListE);
  }

  /**
   * Filter sub issuers by postion
   *
   * @param filter - value used in the filater
   * @returns any[]
   */
  Filter(orgs: Organization[], filter, pageIndex, pageSize) {
    let stat = filter === 'Pending' ? false : true;

    return this.getCategoriesPgonation(orgs, pageIndex, pageSize);
  }

  /**
   * Search a sub issuer that contains the key search
   *
   * @param search - value used in the search
   * @returns any[]
   */
  Search(orgs: any[], search, pageIndex, pageSize) {
    // if (search !== undefined) {
    let list: any = [];
    list = orgs.filter(
      (it) =>
        it.organizationInfo.Name.toLowerCase().includes(search.toLowerCase()) ||
        it.organizationInfo.Id?.toLowerCase().includes(search.toLowerCase()) ||
        it.organizationInfo.statu
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        it.group.groupName.toLowerCase().includes(search.toLowerCase()) ||
        it.group.categories.name.toLowerCase().includes(search.toLowerCase()) ||
        it.group.categories.issuer.toLowerCase().includes(search.toLowerCase())
    );
    return list;
    // } else {
    // return this.getCategoriesPgonation(orgs, pageIndex, pageSize);
    // }
  }

  paginationEvent(orgs: Organization[], pageEvent): Observable<any> {
    return this.getCategoriesPgonation(
      orgs,
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }
  // updateCategories(
  //   categories: CategoryModel[]
  // ): Observable<ResponseObject<CategoryModel[]>> {
  //   return this.http.put<ResponseObject<CategoryModel[]>>(
  //     `${API_ISSUER_URL}/categories`,
  //     categories
  //   );
  // }
  updateCategories(categories): Observable<ResponseObject<CategoryModel[]>> {
    return of(categories);
  }
}
