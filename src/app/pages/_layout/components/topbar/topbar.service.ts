import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const API_ISSUER_URL = `${environment.apiUrl}/issuer`;

@Injectable({
  providedIn: 'root'
})
export class TopbarService {
  constructor(private http: HttpClient) {}
  SwitchOrganization(IdOrganization): any {
    return this.http
      .put<any>(`${API_ISSUER_URL}/switchOrganization/${IdOrganization}`, {})
      .subscribe((result) => {});
  }
}
