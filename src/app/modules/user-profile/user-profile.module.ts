import { AccountInformationComponent } from './account-information/account-information.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import {
  NgbDropdownModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileCardComponent } from './_components/profile-card/profile-card.component';
import { CRUDTableModule } from 'src/app/shared/crud-table/crud-table.module';
import { DropdownMenusModule } from 'src/app/partials/content/dropdown-menus/dropdown-menus.module';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { BlockchainIdentityComponent } from './blockchain-identity/blockchain-identity.component';
import { OrganizationInformationComponent } from './organization-information/organization-information.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileCardComponent,
    ProfileOverviewComponent,
    PersonalInformationComponent,
    AccountInformationComponent,
    ChangePasswordComponent,
    AccountSettingsComponent,
    BlockchainIdentityComponent,
    OrganizationInformationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CRUDTableModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    UserProfileRoutingModule,
    DropdownMenusModule,
    NgbDropdownModule,
    NgbTooltipModule,
    WidgetsModule,
    SharedModule,
    HttpClientJsonpModule
  ],
  entryComponents: []
})
export class UserProfileModule {}
