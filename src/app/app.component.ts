import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

// language list
import { locale as arLang } from './modules/i18n/vocabs/ar';
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';

import { SplashScreenService } from './partials/layout/splash-screen/splash-screen.service';
import { TableExtendedService } from './shared/crud-table/services/table.extended.service';
import { TranslationService } from './modules/i18n/translation.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  constructor(
    private router: Router,
    private tableService: TableExtendedService,
    private splashScreenService: SplashScreenService,
    private translationService: TranslationService
  ) {
    // register translations
    this.translationService.loadTranslations(
      arLang,
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit(): void {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // clear filtration paginations and others
        this.tableService.setDefaults();
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  title = 'Doccerts';

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
