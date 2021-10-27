import { VerifierModule } from './../modules/verifier/verifier.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PagesRoutingModule } from './pages-routing.module';
import {
  NgbDropdownModule,
  NgbModule,
  NgbProgressbarModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from '../modules/i18n/translation.module';
import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
import { ExtrasModule } from '../partials/layout/extras/extras.module';
import { SubheaderModule } from '../partials/layout/subheader/subheader.module';
import { CoreModule } from '../core';
import { IssuerRoutingModule } from '../modules/issuer/issuer-routing.module';

import { SharedModule } from '../shared/shared.module';
import { OrganizationSelectorComponent } from './_layout/components/topbar/organization-selector/organization-selector.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    OrganizationSelectorComponent
  ],
  imports: [
    NgbModule,
    SharedModule,
    CommonModule,
    IssuerRoutingModule,
    VerifierModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule
  ]
})
export class LayoutModule { }
