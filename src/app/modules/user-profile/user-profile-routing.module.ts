import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { UserProfileComponent } from './user-profile.component';
import { BlockchainIdentityComponent } from './blockchain-identity/blockchain-identity.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { OrganizationInformationComponent } from './organization-information/organization-information.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: 'overview',
        component: ProfileOverviewComponent
      },
      {
        path: 'personal-information',
        component: PersonalInformationComponent
      },
      {
        path: 'organization-information',
        component: OrganizationInformationComponent
      },
      {
        path: 'account-information',
        component: AccountInformationComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent
      },
      {
        path: 'blockchain-identity',
        component: BlockchainIdentityComponent
      },

      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}
