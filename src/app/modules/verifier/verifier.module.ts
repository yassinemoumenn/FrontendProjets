import { HttpClientModule } from '@angular/common/http';
import { VerifierRoutingModule } from './verifier-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifierComponent } from './verifier.component';
import { VerifyCertificateComponent } from './verify-certificate/verify-certificate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestVerifierComponent } from './organization/request-verifier/request-verifier.component';
import { ViewOrganizationComponent } from './organization/view-organization/view-organization.component';
import { OrganizationComponent } from './organization/organization.component';
import { VerifierInvitesComponent } from './verifier-invites/verifier-invites.component';
import { ViewVerifierInvitesComponent } from './verifier-invites/view-verifier-invites/view-verifier-invites.component';

@NgModule({
  declarations: [
    VerifierComponent,
    VerifyCertificateComponent,
    RequestVerifierComponent,
    ViewOrganizationComponent,
    OrganizationComponent,
    VerifierInvitesComponent,
    ViewVerifierInvitesComponent
  ],
  imports: [CommonModule, VerifierRoutingModule, HttpClientModule, SharedModule]
})
export class VerifierModule {}
