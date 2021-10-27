import { UserRegistrationComponent } from './registration/user-registration/user-registration.component';
import { OrganizationRegistrationComponent } from './registration/organization-registration/organization-registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { OrganizationTypesComponent } from './registration/organization-types/organization-types.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { returnUrl: window.location.pathname }
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'register/user',
        component: UserRegistrationComponent
      },
      {
        path: 'register/organization',
        component: OrganizationRegistrationComponent
      },
      {
        path: 'register/organizationTypes',
        component: OrganizationTypesComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'verification',
        component: TwoFactorComponent
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
