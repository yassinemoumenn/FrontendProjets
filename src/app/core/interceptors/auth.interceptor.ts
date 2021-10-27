import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { concatMap, map, mergeMap, retryWhen, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrganizationService } from './../../modules/Organization/organization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private organizatioService: OrganizationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION'
    };

    const authReq = req.clone({
      withCredentials: true,
      setHeaders: { ...headers }
    });

    if (
      req.url.endsWith('/refresh') ||
      req.url.endsWith('/signin') ||
      req.url.endsWith('/verifier') ||
      req.url.endsWith('/recipient') ||
      req.url.endsWith('/register/user') ||
      req.url.endsWith('/register/Organization') ||
      req.url.includes('/home/') ||
      req.url.endsWith('/sendSignupCode') ||
      req.url.endsWith('/verifySignUpCode') ||
      req.url.includes('/validate/') ||
      req.url.endsWith('/sendSignUpCodeViaEmail') ||
      req.url.endsWith('/verifySignUpEmail') ||
      req.url.endsWith('/sendMessage')
    ) {
      return next.handle(authReq);
    }

    if (this.organizatioService.ImpersonateToken.value !== null) {
      let T = this.organizatioService.ImpersonateToken.value + '';
      let request = req.clone({
        withCredentials: true,
        setHeaders: {
          ...headers,
          Authorization: `Bearer ${T}`
        }
      });
      return next.handle(request);
    } else {
      return this.authService.token$.pipe(
        map((token) => {
          return req.clone({
            withCredentials: req.url.includes('https://public.next.doccerts.com') || req.url.includes('http://localhost:3000') ? false : true,
            setHeaders: {
              ...headers,
              Authorization: `Bearer ${token}`
            }
          });
        }),
        concatMap((authReq) =>
          next.handle(authReq).pipe(
            tap((event) => {
              if (event instanceof HttpResponse) {
                let impersonater = event.headers.get('Impersonator') || '';
                if (impersonater !== '') {
                  localStorage.setItem('impersonater', impersonater);
                }
              }
            })
          )
        ),
        retryWhen((errors: Observable<any>) =>
          errors.pipe(
            mergeMap((error, index) => {
              // any other error than 401 with {error: 'Token expired'} should be ignored by this retryWhen
              if (error.status !== 401) {
                return throwError(error);
              }

              if (index === 0) {
                // first time execute refresh token logic...
                return this.authService.refreshToken$;
              }

              this.router.navigate(['/home']);
              return throwError(error);
            }),
            take(2)
            // first request should refresh token and retry,
            // if there's still an error the second time is the last time and should navigate to login
          )
        )
      );
    }
  }
}
