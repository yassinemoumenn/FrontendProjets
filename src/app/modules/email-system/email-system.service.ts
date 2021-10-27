import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailModel } from './Mail.model';

const API_AUTH_URL = `${environment.apiUrl}/email-system`;

@Injectable({
  providedIn: 'root'
})
export class EmailSystemService {
  constructor(private http: HttpClient) {}

  sendMessage(message: MailModel): Observable<MailModel> {
    return this.http.post<MailModel>(`${API_AUTH_URL}/sendMessage`, {
      message
    });
  }
  getAllMessages(): Observable<MailModel[]> {
    return this.http.get<MailModel[]>(`${API_AUTH_URL}/getAllMessages`);
  }

  getInboxMessages(): Observable<MailModel[]> {
    return this.http.get<MailModel[]>(`${API_AUTH_URL}/getInboxMessages`);
  }

  getSentMessages(): Observable<MailModel[]> {
    return this.http.get<MailModel[]>(`${API_AUTH_URL}/getSentMessages`);
  }
}
