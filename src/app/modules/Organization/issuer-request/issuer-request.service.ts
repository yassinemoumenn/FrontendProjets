import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IssuerModel } from '../../issuer/Issuer.model';

@Injectable({
  providedIn: 'root'
})
export class IssuersRequestsService {
  constructor() {}

  listLength: number = 0;

  getIssuersRequestPagination(
    ListRequests: IssuerModel[],
    pageIndex,
    pageSize
  ): Observable<any> {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = ListRequests[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return of(ListE);
  }

  Search(requests: any[], search, pageIndex, pageSize) {
    if (search !== undefined) {
      let list: any = [];
      list = requests.filter(
        (it) =>
          it.firstname.toLowerCase().includes(search.toLowerCase()) ||
          it.lastname.toLowerCase().includes(search.toLowerCase()) ||
          it.email.toLowerCase().includes(search.toLowerCase()) ||
          it.occupation.toLowerCase().includes(search.toLowerCase()) ||
          it.phone.placeHolder.includes(search)
      );
      this.listLength = list.length;
      return this.getIssuersRequestPagination(list, pageIndex, pageSize);
    } else {
      this.listLength = requests.length;
      return this.getIssuersRequestPagination(requests, pageIndex, pageSize);
    }
  }

  paginationEvent(ListRequests: IssuerModel[], pageEvent): Observable<any> {
    return this.getIssuersRequestPagination(
      ListRequests,
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }
}
