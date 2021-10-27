import { AffectUserToGroupComponent } from './users/affect-user-to-group/affect-user-to-group.component';
import { CreditWalletComponent } from './credit-wallet/credit-wallet.component';
import { ViewRequestsComponent } from './issuer-request/view-requests/view-requests.component';
import { IssuerRequestsComponent } from './issuer-request/issuer-request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './Organization-routing.module';
import { OrganizationComponent } from './Organization.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { FaqComponent } from './faq-organization/faq/faq.component';
import { GroupsComponent } from './groups/groups.component';
import { ViewGroupsComponent } from './groups/view-groups/view-groups.component';
import { MatChipsModule } from '@angular/material/chips';
import { AddEditGroupComponent } from './groups/add-edit-group/add-edit-group.component';
import { UsersComponent } from './users/users.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { InviteUserComponent } from './users/invite-user/invite-user.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    OrganizationComponent,
    FaqComponent,
    GroupsComponent,
    ViewGroupsComponent,
    AddEditGroupComponent,
    UsersComponent,
    ViewUsersComponent,
    AddUserComponent,
    IssuerRequestsComponent,
    ViewRequestsComponent,
    CreditWalletComponent,
    InviteUserComponent,
    AffectUserToGroupComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    NgbModule,
    MatExpansionModule,
    SharedModule,
    MatChipsModule,
    MatInputModule
  ],
  bootstrap: [OrganizationComponent, FaqComponent]
})
export class OrganizationModule {}
