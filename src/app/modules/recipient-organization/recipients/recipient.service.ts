import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Page } from 'src/app/models/helpers/Page';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../auth/authentication.service';
import { CategoryModel } from '../../issuer/category/Category.model';
import { RecipientModel } from '../../recipient/Recipient.model';

const API_RECIPIENT_URL = `${environment.apiUrl}/RecipientOrganization`;
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  cache: Observable<any>[] = [];

  cacheRequest: Observable<any>[] = [];

  constructor(
    private http: HttpClient,
    private authSer: AuthenticationService
  ) {}

  /**
   * Create New Recipient
   *
   * @param recipient - Recipient object
   * @returns Observable<any>
   */
  CreateRecipient(recipient: any, checked: boolean): Observable<any> {
    const body = JSON.stringify(recipient);

    return this.http.post<any>(`${API_RECIPIENT_URL}/`, body, {
      params: {
        sendCredentials: checked
      }
    });
  }

  /**
   * Get all Recipient, we use also this method to call search and filter.
   *
   * @param pageSize - Page size
   * @param pageIndex - Page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @returns Observable<any>
   */
  GetRecipients(
    size: number,
    page: number = 0,
    search?: string
  ): Observable<Page<RecipientModel>> {
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
      .get<any>(`${API_RECIPIENT_URL}/users`, {
        params
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
   * Update recipient
   *
   * @param recipientID recipient id to update
   * @param recipient new recipient info
   * @returns
   */
  UpdateRecipient(recipientID: string, recipient: any): Observable<any> {
    const body = JSON.stringify(recipient);
    return this.http.put<any>(`${API_RECIPIENT_URL}/${recipientID}`, body);
  }

  /**
   * Delete recipient
   *
   * @param recipientID Recipient id to delete
   * @returns
   */
  DeleteRecipient(recipientID): Observable<any> {
    return this.http.delete<any>(`${API_RECIPIENT_URL}/${recipientID}`);
  }

  /**
   * Get recipient by id
   *
   * @param recipientID Recipient id to get
   * @returns
   */
  GetRecipientByID(recipientID): Observable<any> {
    return this.http.get<any>(`${API_RECIPIENT_URL}/recipients/${recipientID}`);
  }

  /**
   * Search recipient by first name or last name
   *
   * @param search
   * @returns Observable<any>
   */
  SearchRecipient(search?): Observable<any> {
    let params = new HttpParams();

    if (search) {
      params = params.append('search', search.trim());
    }
    return this.http.get<any>(`${API_RECIPIENT_URL}/AllUsers`, {
      params: params
    });
  }

  /**
   * Send request to join a category
   *
   * @param recipientID Recipient id to request
   * @param category Catefory requested
   * @returns
   */
  RequestCategory(recipientIDs: string, category: string) {
    let body = [
      {
        recipients: recipientIDs,
        category: category
      }
    ];
    return this.http.put(`${API_RECIPIENT_URL}/issuer`, body);
  }

  /**
   * Get all categories or by group
   *
   * @param grpID Group id
   * @returns
   */
  GetCategories(grpID?): Observable<ResponseObject<CategoryModel[]>> {
    if (grpID) {
      return this.http.get<ResponseObject<CategoryModel[]>>(
        `${API_RECIPIENT_URL}/categories/${grpID}`
      );
    }

    let group: string | undefined = '';

    group = this.getGroupCurrentUser();

    if (group)
      return this.http.get<ResponseObject<CategoryModel[]>>(
        `${API_RECIPIENT_URL}/categories/${group}`
      );
    return of();
  }

  /**
   * Get all organization
   *
   * @returns
   */
  GetOrganizations(): Observable<any> {
    return this.http.get<any>(`${API_RECIPIENT_URL}/organizations`);
  }

  private getGroupCurrentUser = () => {
    return this.getAffiliationCurrentUser()?.group.id;
  };
  private getAffiliationCurrentUser = () => {
    let currentUser: User | null = this.getCurrentUser();
    return currentUser?.groups?.find((aff) => aff.currentOrganization);
  };
  private getCurrentUser = () => {
    let currentUser: User | null = this.authSer.currentUserValue;
    return currentUser;
  };

  /**
   * Send sms to user
   *
   * @param SmsRequest Sms request (phone number and message body)
   * @returns
   */
  SendSms(SmsRequest): Observable<any> {
    return this.http.post(`${API_URL}/SendSMS/en`, SmsRequest);
  }

  /**
   * Send sms to user
   *
   * @param EmailRequest Email request (email and username)
   * @returns
   */
  SendEmail(EmailRequest): Observable<any> {
    return this.http.post(`${API_URL}/auth/inviteUser`, EmailRequest);
  }

  /**
   * Get all Recipient Requests
   *
   * @param size - Page size
   * @param page - Page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @returns Observable<any>
   */

  GetRequestsRecipient(
    size: number,
    page: number = 0,
    filter?: string,
    search?: string
  ): Observable<Page<RecipientModel>> {
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
      .get<any>(`${API_RECIPIENT_URL}/requests`, {
        params
      })
      .pipe(shareReplay(1));

    // First load
    if (this.cacheRequest.length === 0) {
      this.cacheRequest.push(observable$);
      returnedData = observable$;
    } else {
      if (this.cacheRequest.length > page) {
        // Previous
        returnedData = this.cacheRequest[page];
      } else {
        // Next
        this.cacheRequest.push(observable$);
        returnedData = observable$;
      }
    }

    return returnedData;
  }

  /**
   * Accept recipient request
   *
   * @param recipientID Recipient id
   * @returns
   */
  AcceptRequest(recipientID): Observable<Page<RecipientModel>> {
    return this.http.put<Page<RecipientModel>>(
      `${API_RECIPIENT_URL}/accept/${recipientID}`,
      {}
    );
  }

  /**
   * Refuse recipient request
   *
   * @param recipientID Recipient id
   * @returns
   */
  RefuseRequest(recipientID): Observable<Page<RecipientModel>> {
    return this.http.put<Page<RecipientModel>>(
      `${API_RECIPIENT_URL}/refuse/${recipientID}`,
      {}
    );
  }

  /**
   * Send invitation to a recipient to join organization
   *
   * @param recipientID Recipient id
   * @returns
   */
  InviteRecipient(recipientID): Observable<any> {
    return this.http.put(`${API_RECIPIENT_URL}/invite/${recipientID}`, {});
  }
}
