import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifierComponent } from './verifier.component';
import { VerifyCertificateComponent } from './verify-certificate/verify-certificate.component';
import { OrganizationComponent } from './organization/organization.component';
import { VerifierInvitesComponent } from './verifier-invites/verifier-invites.component';

const routes: Routes = [
  {
    path: '',
    component: VerifierComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'verifycertificate',
        component: VerifyCertificateComponent
      },
      {
        path: 'organization',
        component: OrganizationComponent
      },
      {
        path: 'invites',
        component: VerifierInvitesComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifierRoutingModule {}
