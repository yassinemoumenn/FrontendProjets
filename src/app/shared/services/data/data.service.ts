import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  constructor(private http: HttpClient) {}

  public getAll(ns: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${ns}`);
  }
}
