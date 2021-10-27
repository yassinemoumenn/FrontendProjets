import { OrganizationInvitesComponent } from './organization-invites/organization-invites.component';
import { OrganizationRequestsComponent } from './organization-requests/organization-requests.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingOrganizationsComponent } from './listing-organizations/listing-organizations.component';
import { RecipientComponent } from './recipient.component';
import { CertificatesComponent } from './certificates/certificates.component';

const routes: Routes = [
  {
    path: '',
    component: RecipientComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      {
        path: 'organizations',
        component: ListingOrganizationsComponent
      },
      {
        path: 'certificates',
        component: CertificatesComponent
      },
      {
        path: 'requests',
        component: OrganizationRequestsComponent
      },
      {
        path: 'invites',
        component: OrganizationInvitesComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientRoutingModule {}
