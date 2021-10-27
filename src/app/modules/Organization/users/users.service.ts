import { User } from './../../../models/User';
import { ResponseObject } from './../../../models/helpers/ResponseObject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const API_USER_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  listLength: number = 0;

  /** Get users by role
   * @params role
   * @returns list of users
   */
  getUsersByRole(role: string): Observable<ResponseObject<User[]>> {
    return this.http.get<ResponseObject<User[]>>(`${API_USER_URL}/`);
  }

  Search(users: any[], search, pageIndex, pageSize) {
    if (search !== undefined) {
      let list: any = [];
      list = users.filter(
        (it) =>
          it.firstname.toLowerCase().includes(search.toLowerCase()) ||
          it.lastname.toLowerCase().includes(search.toLowerCase()) ||
          it.email?.toLowerCase().includes(search.toLowerCase()) ||
          it.occupation?.toLowerCase().includes(search.toLowerCase()) ||
          it.phone?.placeHolder?.includes(search.toLowerCase()) ||
          it.role.toLowerCase().includes(search.toLowerCase()) ||
          it.birthday?.includes(search.toLowerCase())
      );
      this.listLength = list.length;
      return this.getUsersPagination(list, pageIndex, pageSize);
    } else {
      this.listLength = users.length;
      return this.getUsersPagination(users, pageIndex, pageSize);
    }
  }

  filter(users: any[], filter, search, pageIndex, pageSize) {
    let list: any = [];
    if (filter === 'ALL') {
      this.listLength = users.length;
      list = users;
      return this.getUsersPagination(users, pageIndex, pageSize);
    } else {
      list = users.filter(
        (it) => it.role.toLowerCase() === filter.toLowerCase()
      );
      this.listLength = list.length;
    }
    if (search) {
      list = list.filter(
        (it) =>
          it.firstname.toLowerCase().includes(search.toLowerCase()) ||
          it.lastname.toLowerCase().includes(search.toLowerCase()) ||
          it.email.toLowerCase().includes(search.toLowerCase()) ||
          it.occupation.toLowerCase().includes(search.toLowerCase()) ||
          it.phone.placeHolder.includes(search.toLowerCase()) ||
          it.role.toLowerCase().includes(search.toLowerCase()) ||
          it.birthday.includes(search.toLowerCase())
      );
      this.listLength = list.length;
    }
    return this.getUsersPagination(list, pageIndex, pageSize);
  }

  getUsersPagination(ListUsers: User[], pageIndex, pageSize): Observable<any> {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = ListUsers[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return of(ListE);
  }

  paginationEvent(ListUsers: User[], pageEvent): Observable<any> {
    return this.getUsersPagination(
      ListUsers,
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }
}
