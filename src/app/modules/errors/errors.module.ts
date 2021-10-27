import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './errors.component';
import { Error403Component } from './403/403.component';
import { Error503Component } from './503/503.component';
import { Errors404Component } from './404/404.component';
import { TranslationModule } from '../i18n/translation.module';

@NgModule({
  declarations: [
    ErrorsComponent,
    Error403Component,
    Error503Component,
    Errors404Component
  ],
  imports: [CommonModule, ErrorsRoutingModule, TranslationModule]
})
export class ErrorsModule {}
