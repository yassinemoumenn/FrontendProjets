import { OrganizationInvitesComponent } from './organization-invites/organization-invites.component';
import { OrganizationRequestsComponent } from './organization-requests/organization-requests.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCertificateComponent } from './certificates/add-certificate/add-certificate.component';
import { AddDesignComponent } from './Designs/add-design/add-design.component';
import { ListingDesignsComponent } from './Designs/listing-designs/listing-designs.component';
import { SupportComponent } from './supportCenter/support/support.component';
import { AppAuthGuard } from 'src/app/core/guards/app-auth.guard';
import { SubIssuerComponent } from './sub-issuer/sub-issuer.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { SignersComponent } from './signers/signers.component';
import { CertificateComponent } from './certificates/certificate.component';
import { IssuerComponent } from './issuer.component';
import { VerificationComponent } from 'src/app/shared/components/verification/verification.component';
import { OrganizationsComponent } from './organizations/organizations.component';

const routes: Routes = [
  {
    path: '',
    component: IssuerComponent,
    canActivate: [AppAuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'subIssuer',
        component: SubIssuerComponent
      },
      {
        path: 'recipients',
        component: RecipientsComponent
      },
      {
        path: 'signers',
        component: SignersComponent
      },
      {
        path: 'designs/add-design',
        component: AddDesignComponent
      },
      {
        path: 'designs/listing-designs',
        component: ListingDesignsComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'certificates/add-certificate',
        component: AddCertificateComponent
      },
      {
        path: 'certificate',
        component: CertificateComponent
      },
      {
        path: 'organization',
        component: OrganizationsComponent
      },
      {
        path: 'supportCenter/support',
        component: SupportComponent
      },
      {
        path: 'verification/:id',
        component: VerificationComponent
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
export class IssuerRoutingModule { }
