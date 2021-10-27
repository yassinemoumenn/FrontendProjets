import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthHTTPService } from 'src/app/modules/auth/services/auth-http.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { SnackbarModel } from 'src/app/shared/components/snackbar/snackbar.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(
    private authService: AuthHTTPService,
    private snackbar: SnackbarService,
    private translate: TranslateService,
    private router: Router,
    private zone: NgZone
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        // server-side errors
        switch (error.status) {
          case 0:
            this.snackBar(this.translate.instant('SERVER.ERROR'));
            break;
          case 401:
            // this.snackBar(this.translate.instant('ERROR.SERVER.UNAUTHORIZED'));
            break;
          case 403:
            this.snackBar(this.translate.instant('SERVER.FORBIDDEN'));
            this.logout();
            break;
          case 404:
            this.snackBar(this.translate.instant('SERVER.NOT_FOUND'));
            break;
          case 429:
            this.snackBar(this.translate.instant('SERVER.MANY_REQUESTS'));
            break;
          case 503:
            this.snackBar(this.translate.instant('SERVER.MAINTENANCE'));
            break;
          case 400:
            if (error.error.message === 'Invalid User')
              this.snackBar(
                this.translate.instant('ERROR.TOKEN.BAD_CREDENTIALS')
              );
            break;
          // Redirect to the maintenance page
          default:
            this.snackBar(
              error.error.error ? error.error.error : error.message
            );
            break;
        }
      } else {
        // client-side errors
      }
    });
  }

  snackBar(
    message: string,
    type: 'warning' | 'info' | 'error' = 'warning',
    allowDuplicate: boolean = false,
    action?: string
  ) {
    const snackbar = new SnackbarModel({
      message: message,
      type: type,
      allowDuplicate: allowDuplicate,
      action: action
    });
    this.snackbar.push(snackbar);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
