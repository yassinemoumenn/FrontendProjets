import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Page } from 'src/app/models/helpers/Page';
import { IAffiliation, IPhone, User } from 'src/app/models/User';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../auth/authentication.service';
import { RecipientModel } from '../../recipient/Recipient.model';

const API_ISSUER_URL = `${environment.apiUrl}/issuer`;
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class RecipientsService {
  cache: Observable<any>[] = [];
  filteredData: any[] = [];

  cacheRequest: Observable<any>[] = [];
  filteredDataRequest: any[] = [];

  constructor(
    private http: HttpClient,
    private authSer: AuthenticationService
  ) {}

  /**
   * Create new Recipient
   *
   * @param recipient - Recipient object
   * @returns Observable<any>
   */
  CreateRecipient(recipient: any): Observable<any> {
    let affiliation: IAffiliation | undefined =
      this.getAffiliationCurrentUser();

    const body = {
      recipient: recipient,
      affiliation: affiliation
    };

    return this.http.post<any>(`${API_ISSUER_URL}/recipients`, body);
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
    size?: number,
    page: number = 0,
    filter?: string,
    search?: string
  ): Observable<Page<RecipientModel>> {
    let returnedData: any;
    let params = new HttpParams();

    let group: String | undefined = '';

    group = this.getGroupCurrentUser();

    if (search) {
      params = params.append('search', search.trim());
    }
    if (filter) {
      params = params.append('filter', filter.trim());
    }
    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }

    let observable$ = this.http
      .get<any>(`${API_ISSUER_URL}/recipients/group/${group}`, {
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
   * Search recipient by first name or last name
   *
   * @param search
   * @returns Observable<any>
   */
  SearchRecipient(search?): Observable<any> | undefined {
    let group: String | undefined = '';

    group = this.getGroupCurrentUser();

    let params = new HttpParams();

    if (!search) return;

    params = params.append('search', search.trim());
    return this.http.get<any>(`${API_ISSUER_URL}/recipients/invite/${group}`, {
      params
    });
  }
  /**
   * filter recipient by first name or last name
   *
   * @param filter
   * @returns Observable<any>
   */
  FilterRecipient(filter?): Observable<any> {
    let params = new HttpParams();

    if (filter) {
      params = params.append('filter', filter.trim());
    }

    return this.http.get<any>(`${API_ISSUER_URL}/recipients`, {
      params
    });
  }
  /**
   * Update Recipient
   *
   * @param recipientID - Id of recipient to update
   * @param recipient - New recipient informations
   * @returns Observable<any>
   */
  UpdateRecipient(recipientID: string, recipient: any): Observable<any> {
    const body = JSON.stringify(recipient);
    return this.http.put<any>(
      `${API_ISSUER_URL}/recipients/${recipientID}`,
      body
    );
  }

  /**
   * Delete Recipient
   *
   * @param recipientID - Id of recipient to delete
   * @returns Observable<any>
   */
  DeleteRecipient(recipientID): Observable<any> {
    let group: String | undefined = '';

    group = this.getGroupCurrentUser();

    return this.http.delete<any>(
      `${API_ISSUER_URL}/recipients/${group}/${recipientID}`
    );
  }

  /**
   * Get one Recipient by ID
   *
   * @param recipientID - Id of recipient to retrieve
   * @returns Observable<any>
   */
  GetRecipientByID(recipientID): Observable<any> {
    return this.http.get<any>(`${API_ISSUER_URL}/recipients/${recipientID}`);
  }

  /**
   * Assign Categories to a specific recipient
   *
   * @param idRecipient Id Recipient
   * @param categories Categories to assign
   * @returns
   */
  AssignCategories(idRecipient: string, categories: string[]): Observable<any> {
    return this.http.put<any>(
      `${API_ISSUER_URL}/recipients/${idRecipient}/AddCategory`,
      categories
    );
  }

  /**
   * Invite recipients to categories
   * @param data {userIds:[], categories:[]}
   * @returns Observable<any>
   */
  InviteRecipients(data: { userIDs: []; categories: [] }): Observable<any> {
    return this.http.put<any>(`${API_ISSUER_URL}/recipients/invite`, data);
  }

  SendSms(SmsRequest): Observable<any> {
    return this.http.post(`${API_URL}/SendSMS/en`, SmsRequest);
  }

  /**
   * Get all Categories
   *
   * @returns Observable<any>
   */
  GetCategories(): Observable<any> {
    return this.http.get<any>(`${API_ISSUER_URL}/categories`);
  }

  /**
   * Validate phone on server side, if the phone already taken or not
   * @param phone phone object to validate
   *
   * @returns Observable<any>
   */
  ValidatePhone(phone: IPhone): Observable<any> {
    return this.http.post(`${API_URL}/users/validate/phone`, phone);
  }

  /**
   * Validate email on server side, if the email already taken or not
   * @param email email to validate
   * @returns Observable<any>
   */
  ValidateEmail(email: string): Observable<any> {
    return this.http.post(
      `${API_URL}/users/validate/email/${email.toLowerCase()}`,
      {}
    );
  }

  /**
   * Validate username on server side, if the username already taken or not
   * @param email username to validate
   * @returns Observable<any>
   */
  ValidateUsername(username: string): Observable<any> {
    return this.http.post(
      `${API_URL}/users/validate/username/${username.toLowerCase()}`,
      {}
    );
  }

  /**
   * Get Id group of current user
   * @returns string | undefined
   */
  private getGroupCurrentUser = (): string | undefined => {
    return this.getAffiliationCurrentUser()?.group.id;
  };

  /**
   * Get Affiliation of current user
   * @returns IAffiliation | undefined
   */
  private getAffiliationCurrentUser = (): IAffiliation | undefined => {
    let currentUser: User | null = this.getCurrentUser();
    return currentUser?.groups.find((aff) => aff.currentOrganization);
  };

  /**
   * Get current user
   * @returns User | null
   */
  private getCurrentUser = (): User | null => {
    let currentUser: User | null = this.authSer.currentUserValue;
    return currentUser;
  };

  /**
   * Get all Recipient Requests, we use also this method to call search and filter.
   *
   * @param pageSize - Page size
   * @param pageIndex - Page index
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

    let group: String | undefined = '';

    group = this.getGroupCurrentUser();

    if (search) {
      params = params.append('search', search.trim());
    }

    if (page !== undefined && size !== undefined) {
      params = params.append('page', page);
      params = params.append('size', size);
    }

    let observable$ = this.http
      .get<any>(`${API_ISSUER_URL}/recipientsRequest/${group}`, {
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
   * Accept recipient request by issuer
   *
   * @param idRec Id recipient
   * @param category category requested
   * @returns Observable<any>
   */
  AcceptRecipientRequest(idRec, category): Observable<any> {
    let group: string | undefined = '';

    group = this.getGroupCurrentUser();

    return this.http.put<any>(
      `${API_ISSUER_URL}/recipientsRequest/${idRec}/${group}/${category}/accept`,
      {}
    );
  }

  /**
   * Refuse recipient request by issuer
   *
   * @param idRec Id recipient
   * @param category category requested
   * @returns Observable<any>
   */
  RefuseRecipientRequest(idRec, category): Observable<any> {
    let group: string | undefined = '';

    group = this.getGroupCurrentUser();

    return this.http.put<any>(
      `${API_ISSUER_URL}/recipientsRequest/${idRec}/${group}/${category}/refuse`,
      {}
    );
  }

  /**
   * Accept recipient organization request by issuer
   *
   * @param idOrg Id organization
   * @param idReq Id request
   * @returns Observable<any>
   */
  AcceptRecipientOrgRequest(idOrg, idReq): Observable<any> {
    return this.http.put<any>(
      `${API_ISSUER_URL}/recipientsOrganizationRequest/${idOrg}/${idReq}/accept`,
      {}
    );
  }

  /**
   * Refuse recipient organization request by issuer
   *
   * @param idOrg Id organization
   * @param idReq Id request
   * @returns Observable<any>
   */
  RefuseRecipientOrgRequest(idOrg, idReq): Observable<any> {
    let group: string | undefined = '';

    group = this.getGroupCurrentUser();

    return this.http.put<any>(
      `${API_ISSUER_URL}/recipientsOrganizationRequest/${idOrg}/${idReq}/refuse`,
      {}
    );
  }
}
