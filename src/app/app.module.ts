import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SplashScreenModule } from './partials/layout/splash-screen/splash-screen.module';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './modules/auth/authentication.service';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { GlobalErrorHandler } from './core/services/GlobalErrorHandler';
import { throwError } from 'rxjs';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

function appInitializer(authService: AuthenticationService) {
  return () => {
    return new Promise((resolve) => {
      authService.refreshToken$.subscribe().add(resolve);
    })
      .then(() => {
        authService.getUserByToken().subscribe();
      })
      .catch((err) => throwError(err));
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    SplashScreenModule,
    HighlightModule,
    InlineSVGModule.forRoot(),

    // CSRF Protection
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    DatepickerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService]
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          json: () => import('highlight.js/lib/languages/json')
        }
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
