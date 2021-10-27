import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { Index2Component } from './index2/index2.component';
import { ServicesComponent } from './services/services.component';
import { PricingComponent } from './pricing/pricing.component';
import { FeaturesComponent } from './features/features.component';
import { ContactComponent } from './contact/contact.component';
import { ScrollspyDirective } from './scrollspy.directive';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    Index2Component,
    ServicesComponent,
    PricingComponent,
    FeaturesComponent,
    BlogComponent,
    ContactComponent,
    ScrollspyDirective,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ScrollToModule.forRoot(),
    NgbModalModule
  ]
})
export class HomeModule {}
