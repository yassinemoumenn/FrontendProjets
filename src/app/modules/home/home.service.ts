import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomePage } from './services/services.component';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { map } from 'rxjs/operators';
import { ContactComponent } from './contact/contact.component';
import { ContactModel } from './contact/Contact.model';

const HOME_API = `${environment.apiUrl}/home`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getAllCounters(): Observable<HomePage> {
    return this.httpClient
      .get<ResponseObject<HomePage>>(HOME_API)
      .pipe(
        map((HomePageCounter: ResponseObject<HomePage>) => HomePageCounter.data)
      );
  }
  sendContactform(contact: ContactModel) {
    return this.httpClient.post(`${HOME_API}/sendMessage`, contact);
  }

  subscribeTonewsLetter(email: string) {
    return this.httpClient.put(`${HOME_API}/subscribe/${email}`, null);
  }
}
