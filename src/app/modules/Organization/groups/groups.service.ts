import { filter } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GroupModel } from 'src/app/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor() {}
  listLength: number = 0;
  getGroupPagination(
    groups: GroupModel[],
    pageIndex,
    pageSize
  ): Observable<any> {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = groups[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return of(ListE);
  }

  paginationEvent(groups: GroupModel[], pageEvent): Observable<any> {
    return this.getGroupPagination(
      groups,
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }

  Search(groups: GroupModel[], search, pageIndex, pageSize) {
    if (search !== undefined) {
      let list: any = [];
      list = groups.filter(
        (it) =>
          it.name.toLowerCase().includes(search.toLowerCase()) ||
          it.description?.toLowerCase().includes(search.toLowerCase()) ||
          it.recipients?.length === search ||
          it.signers?.length === search
      );
      this.listLength = list.length;
      return this.getGroupPagination(list, pageIndex, pageSize);
    } else {
      this.listLength = groups.length;
      return this.getGroupPagination(groups, pageIndex, pageSize);
    }
  }

  Filter(groups: GroupModel[], filter, search, pageIndex, pageSize) {
    if (search) {
      let list: any = [];
      if (filter.includes('groups with issuer')) {
        list = groups.filter(
          (it) =>
            (it.issuer !== '' || it.issuer) &&
            (it.name.toLowerCase().includes(search.toLowerCase()) ||
              it.description?.toLowerCase().includes(search.toLowerCase()) ||
              it.recipients?.length === search ||
              it.signers?.length === search)
        );
      } else if (filter.includes('groups without issuer')) {
        list = groups.filter(
          (it) =>
            (it.issuer === '' || !it.issuer) &&
            (it.name.toLowerCase().includes(search.toLowerCase()) ||
              it.description?.toLowerCase().includes(search.toLowerCase()) ||
              it.recipients?.length === search ||
              it.signers?.length === search)
        );
      }
      this.listLength = list.length;
      return this.getGroupPagination(list, pageIndex, pageSize);
    } else {
      let list: any = [];
      if (filter.includes('groups with issuer')) {
        list = groups.filter((it) => it.issuer !== '' || it.issuer);
      } else if (filter.includes('groups without issuer')) {
        list = groups.filter((it) => it.issuer === '' || !it.issuer);
      } else {
        list = groups;
      }
      this.listLength = list.length;
      return this.getGroupPagination(list, pageIndex, pageSize);
    }
  }

  compare(groups, sortBy, isAsc) {
    if (sortBy === 'name') {
      switch (isAsc) {
        case 'desc': {
          groups.sort((a: any, b: any) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });

          break;
        }
        case 'asc': {
          groups.sort((a: any, b: any) => {
            if (a.Category < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        }
        default:
          break;
      }
    }
    return groups;
  }

  Sort(groups: GroupModel[], sort, pageIndex, pageSize) {
    groups = this.compare(groups, sort.active, sort.direction);
    return this.getGroupPagination(groups, pageIndex, pageSize);
  }
}
