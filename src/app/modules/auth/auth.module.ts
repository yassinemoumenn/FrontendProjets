import { UserRegistrationComponent } from './registration/user-registration/user-registration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { NumberDirective } from './two-factor/numbers-only.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationRegistrationComponent } from './registration/organization-registration/organization-registration.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OrganizationTypesComponent } from './registration/organization-types/organization-types.component';
import { PwdChangeComponent } from './pwd-changed/pwd-change.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    TwoFactorComponent,
    NumberDirective,
    OrganizationRegistrationComponent,
    UserRegistrationComponent,
    OrganizationTypesComponent,
    PwdChangeComponent
  ],
  imports: [
    SharedModule,
    Ng2TelInputModule,
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    NgSelectModule,
    MatFormFieldModule,
    MatTabsModule
  ],
  providers: []
})
export class AuthModule {}
