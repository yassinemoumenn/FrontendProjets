import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { TranslationService } from './modules/i18n/translation.service';
import { SplashScreenService } from './partials/layout/splash-screen/splash-screen.service';
import { Router } from '@angular/router';
import { TableExtendedService } from './shared/crud-table/services/table.extended.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  beforeEach(() => {
    const routerStub = () => ({ events: { subscribe: (f) => f({}) } });
    const tableExtendedServiceStub = () => ({ setDefaults: () => ({}) });
    const splashScreenServiceStub = () => ({ hide: () => ({}) });
    const translationServiceStub = () => ({
      loadTranslations: (
        arLang,
        enLang,
        chLang,
        esLang,
        jpLang,
        deLang,
        frLang
      ) => ({})
    });

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: TableExtendedService, useFactory: tableExtendedServiceStub },
        { provide: SplashScreenService, useFactory: splashScreenServiceStub },
        { provide: TranslationService, useFactory: translationServiceStub }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`Doccerts`);
  });

  it('makes expected calls', () => {
    const splashScreenServiceStub: SplashScreenService =
      fixture.debugElement.injector.get(SplashScreenService);
    const tableExtendedServiceStub: TableExtendedService =
      fixture.debugElement.injector.get(TableExtendedService);
    jest.spyOn(splashScreenServiceStub, 'hide');
    splashScreenServiceStub.hide();
    jest.spyOn(tableExtendedServiceStub, 'setDefaults');
    tableExtendedServiceStub.setDefaults();
    component.ngOnInit();
    expect(splashScreenServiceStub.hide).toHaveBeenCalledTimes(1);
    expect(tableExtendedServiceStub.setDefaults).toHaveBeenCalledTimes(1);
  });
});
