import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'recipient',
        loadChildren: () =>
          import('../modules/recipient/recipient.module').then(
            (m) => m.RecipientModule
          )
      },
      {
        path: 'issuer',
        loadChildren: () =>
          import('../modules/issuer/issuer.module').then((m) => m.IssuerModule)
      },
      {
        path: 'verifier',
        loadChildren: () =>
          import('../modules/verifier/verifier.module').then(
            (m) => m.VerifierModule
          )
      },
      {
        path: 'signer',
        loadChildren: () =>
          import('../modules/signer/signer.module').then((m) => m.SignerModule)
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          )
      },
      {
        path: 'organization',
        loadChildren: () =>
          import('../modules/Organization/Organization.module').then(
            (m) => m.OrganizationModule
          )
      },

      {
        path: 'recipient',
        loadChildren: () =>
          import('../modules/recipient/recipient.module').then(
            (m) => m.RecipientModule
          )
      },
      {
        path: 'recipient-organization',
        loadChildren: () =>
          import(
            '../modules/recipient-organization/recipient-organization.module'
          ).then((m) => m.RecipientOrganizationModule)
      },
      {
        path: 'email-system',
        loadChildren: () =>
          import('../modules/email-system/email-system.module').then(
            (m) => m.EmailSystemModule
          )
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'error/404'
      },
      {
        path: 'my-activity',
        loadChildren: () =>
          import('../modules/my-activity/my-activity.module').then(
            (m) => m.MyActivityModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
