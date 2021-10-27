import { CreditWalletComponent } from './credit-wallet/credit-wallet.component';
import { IssuerRequestsComponent } from './issuer-request/issuer-request.component';
import { GroupsComponent } from './groups/groups.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq-organization/faq/faq.component';
import { OrganizationComponent } from './Organization.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'faq-organization/faq',
        component: FaqComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'IssuersRequests',
        component: IssuerRequestsComponent
      },
      {
        path: 'creditWallet',
        component: CreditWalletComponent
      },
      {
        path: 'creditWallet/credit-wallet',
        component: CreditWalletComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
