import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRecipientsComponent } from './recipients/upload-recipients/upload-recipients.component';
import { RecipientOrganizationComponent } from './recipient-organization.component';
import { ViewCertificatesComponent } from './certificates/view-certificates/view-certificates.component';
import { RecipientOrganizationRoutingModule } from './recipient-organization-routing.module';
import { RecipientsComponent } from './recipients/recipients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CertificatesComponent } from './certificates/certificates.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewRecipientsComponent } from './recipients/view-recipients/view-recipients.component';
import { AddEditRecipientComponent } from './recipients/add-edit-recipient/add-edit-recipient.component';
import { InviteRecipientsComponent } from './recipients/invite-recipients/invite-recipients.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignCategoriesComponent } from './recipients/view-recipients/assign-categories/assign-categories.component';
import { RequestRecipientComponent } from './recipients/request-recipient/request-recipient.component';

@NgModule({
  declarations: [
    RecipientOrganizationComponent,
    AddEditRecipientComponent,
    UploadRecipientsComponent,
    ViewCertificatesComponent,
    RecipientsComponent,
    RequestRecipientComponent,
    CertificatesComponent,
    ViewRecipientsComponent,
    AssignCategoriesComponent,
    InviteRecipientsComponent
  ],
  imports: [
    CommonModule,
    RecipientOrganizationRoutingModule,
    SharedModule,
    NgbDropdownModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSlideToggleModule
  ]
})
export class RecipientOrganizationModule {}
