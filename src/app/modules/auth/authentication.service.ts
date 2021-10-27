import { OrganizationService } from './../Organization/organization.service';
import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  Subscription,
  throwError,
  defer
} from 'rxjs';
import {
  map,
  catchError,
  switchMap,
  finalize,
  filter,
  take,
  tap
} from 'rxjs/operators';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { IPhone, User } from '../../models/User';
import { AuthHTTPService } from './services/auth-http.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Organization, OrganizationType } from 'src/app/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  tokenSubject$ = new BehaviorSubject<string | null>('');

  // public fields
  currentUser$: Observable<User | null>;
  isLoading$: Observable<boolean>;

  currentUserSubject!: BehaviorSubject<User | null>;
  currentOrganizationSubject!: BehaviorSubject<Organization | null>;
  isLoadingSubject: BehaviorSubject<boolean>;

  typeOrg?: OrganizationType = OrganizationType.ISSUERORGANIZATION;

  public username: string = '';
  public password: string = '';
  public phone: string = '';
  public email?: string = '';

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: User | null) {
    this.currentUserSubject.next(user);
  }
  get currentOrganizationValue(): Organization | null {
    return this.currentOrganizationSubject.value;
  }

  set currentOrganizationValue(organization: Organization | null) {
    this.currentOrganizationSubject.next(organization);
  }
  get getPhone() {
    return this.phone;
  }
  set setPhone(phone: string) {
    this.phone = phone;
  }
  get getEmail() {
    return this.email;
  }
  set setEmail(email: string) {
    this.email = email;
  }

  get getUsername() {
    return this.username;
  }
  set setUsername(Username: string) {
    this.username = Username;
  }

  get getPassword() {
    return this.password;
  }
  set setPassword(password: string) {
    this.password = password;
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private snackbarService: SnackbarService,
    private organizationService: OrganizationService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentOrganizationSubject = new BehaviorSubject<Organization | null>(
      null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();

    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
  }

  // public methods

  login(email: string, password: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((token: ResponseObject<string>) => {
        this.tokenSubject$.next(token.data);
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout(isForVerification: boolean = false): Observable<any> {
    this.organizationService.ImpersonateToken.next(null);
    return this.authHttpService.logout().pipe(
      map(() => {
        this.tokenSubject$.next(null);
        this.currentUserSubject.next(null);
        this.currentOrganizationSubject.next(null);
        let impersonaterId = localStorage.getItem('impersonater') || '';
        if (impersonaterId !== '') localStorage.removeItem('impersonater');
        if (!isForVerification) this.router.navigate(['/home']);
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getUserByToken(): Observable<User> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken().pipe(
      map((user: User) => {
        if (user) {
          if (user.role === 'ADMIN') {
            this.authHttpService.getCurrentOrganization().subscribe((data) => {
              this.currentOrganizationSubject.next(data['data']);
              // this.currentOrganizationSubject =
              //   new BehaviorSubject<Organization | null>(data['data']);
            });
          }
          this.currentUserSubject = new BehaviorSubject<User | null>(user);
        } else {
          this.router.navigate(['/home']);
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  registration(user: User) {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        if (user.phone?.placeHolder) {
          this.phone = user.phone.placeHolder;
          this.email = user.email;
          this.SendCodeSms(user.phone.placeHolder, 'en').subscribe((data) => {
            this.snackbarService.push({
              message: 'verification code sent successfully',
              type: 'success'
            });
          });
          this.router.navigate(['/auth/verification']);
        } else {
          this.isLoadingSubject.next(false);
        }
      }),
      switchMap(() => this.login(user.username, user.password ?? '')),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  //  organization registration
  registerOrganization(request: any) {
    let user = request.admin;
    this.isLoadingSubject.next(true);
    return this.authHttpService.registerOrganization(request).pipe(
      map(() => {
        if (user.phone?.placeHolder) {
          this.phone = user.phone.placeHolder;
          this.email = user.email;
          this.SendCodeSms(user.phone.placeHolder, 'en').subscribe((data) => {
            this.snackbarService.push({
              message: 'verification code sent successfully',
              type: 'success'
            });
          });
          this.router.navigate(['/auth/verification']);
        } else {
          this.isLoadingSubject.next(false);
        }
      }),
      switchMap(() => this.login(user.username, user.password ?? '')),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  token$ = this.tokenSubject$.pipe(
    filter((token) => token !== null),
    take(1)
  );

  refreshToken$: Observable<any> = defer(() => {
    if (this.tokenSubject$.value === null) {
      return this.token$;
    }

    this.tokenSubject$.next(null);

    return this.authHttpService.refreshToken().pipe(
      tap((res: ResponseObject<string>) => {
        this.tokenSubject$.next(res.data);
      }),
      catchError((err) => {
        this.router.navigate(['/home']);
        return throwError(err);
      })
    );
  });

  get token(): string | null {
    return this.tokenSubject$.value;
  }

  set token(token) {
    this.tokenSubject$.next(token);
  }
  SendCodeSms(phone: string, language: string) {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .sendSignupCodeSms(phone, language)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  verifyCodeSms(phone: string, code: string) {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .verifySignUpCodeSms(phone, code)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  SendCodeEmail(email: string) {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .sendSignupCodeEmail(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  verifyCodeEmail(email: string, code: string) {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .verifySignUpCodeEmail(email, code)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  ValidatePhone(phone: IPhone): Observable<any> {
    return this.authHttpService.ValidatePhone(phone);
  }
  ValidateEmail(email: string): Observable<any> {
    return this.authHttpService.ValidateEmail(email.toLowerCase());
  }
  ValidateOrganizationName(organizationName: string): Observable<any> {
    return this.authHttpService.ValidateOrganizationName(
      organizationName.toLowerCase()
    );
  }
  ValidateUsername(username: string): Observable<any> {
    return this.authHttpService.ValidateUsername(username.toLowerCase());
  }
  setTypeOrganization(type) {
    this.typeOrg = type;
  }
  getTypeOrganization() {
    return this.typeOrg;
  }
}
