import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipientOrganizationComponent } from './recipient-organization.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { CertificatesComponent } from './certificates/certificates.component';

const routes: Routes = [
  {
    path: '',
    component: RecipientOrganizationComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      {
        path: 'recipients',
        component: RecipientsComponent
      },
      {
        path: 'certificates',
        component: CertificatesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientOrganizationRoutingModule {}
