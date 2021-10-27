import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCertificateComponent } from './certificates/add-certificate/add-certificate.component';
import { AddDesignComponent } from './Designs/add-design/add-design.component';
import { ListingDesignsComponent } from './Designs/listing-designs/listing-designs.component';
import { SupportComponent } from './supportCenter/support/support.component';
import { IssuerComponent } from './issuer.component';
import { IssuerRoutingModule } from './issuer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { SubIssuerComponent } from './sub-issuer/sub-issuer.component';
import { ViewSubissuerComponent } from './sub-issuer/view-subissuer/view-subissuer.component';
import { AddSubissuerComponent } from './sub-issuer/add-subissuer/add-subissuer.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { CRUDTableModule } from 'src/app/shared/crud-table';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { RecipientsComponent } from './recipients/recipients.component';
import { AddEditRecipientComponent } from './recipients/add-edit-recipient/add-edit-recipient.component';
import { ViewRecipientComponent } from './recipients/view-recipient/view-recipient.component';
import { RequestRecipientComponent } from './recipients/request-recipient/request-recipient.component';
import { AssignCategoriesComponent } from './recipients/assign-categories/assign-categories.component';
import { SignersComponent } from './signers/signers.component';
import { ViewSignersComponent } from './signers/view-signers/view-signers.component';
import { AddEditSignerComponent } from './signers/add-edit-signer/add-edit-signer.component';
import { CertificateComponent } from './certificates/certificate.component';
import { FieldCertificateComponent } from './certificates/field-certificate/field-certificate.component';
import { IssueCertificateComponent } from './certificates/issue-certificate/issue-certificate.component';
import { RevokeCertificateComponent } from './certificates/revoke-certificate/revoke-certificate.component';
import { UploadCertificateComponent } from './certificates/upload-certificate/upload-certificate.component';
import { ViewCertificateComponent } from './certificates/view-certificate/view-certificate.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ViewOrganizationsComponent } from './organizations/view-organizations/view-organizations.component';
import { RequestOrganizationComponent } from './organizations/request-organization/request-organization.component';
import { InviteRecipientsComponent } from './recipients/invite-recipients/invite-recipients.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrganizationRequestsComponent } from './organization-requests/organization-requests.component';
import { OrganizationInvitesComponent } from './organization-invites/organization-invites.component';
import { FullRecipientFieldsComponent } from '../../shared/components/full-recipient-fields/full-recipient-fields.component';
import { ViewOrganizationInvitesComponent } from './organization-invites/view-organization-invites/view-organization-invites.component';
@NgModule({
  declarations: [
    AddCategoryComponent,
    AddDesignComponent,
    ListingDesignsComponent,
    SupportComponent,
    IssuerComponent,
    CategoryComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    IssuerComponent,
    SubIssuerComponent,
    ViewSubissuerComponent,
    AddSubissuerComponent,
    RecipientsComponent,
    AddEditRecipientComponent,
    ViewRecipientComponent,
    RequestRecipientComponent,
    AssignCategoriesComponent,
    InviteRecipientsComponent,
    SignersComponent,
    ViewSignersComponent,
    AddEditSignerComponent,
    CertificateComponent,
    ViewCertificateComponent,
    AddCertificateComponent,
    IssueCertificateComponent,
    FieldCertificateComponent,
    RevokeCertificateComponent,
    UploadCertificateComponent,
    OrganizationsComponent,
    ViewOrganizationsComponent,
    RequestOrganizationComponent,
    OrganizationRequestsComponent,
    OrganizationInvitesComponent,
    ViewOrganizationInvitesComponent
  ],
  imports: [
    InlineSVGModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    NgbDropdownModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    NgSelectModule,
    CommonModule,
    IssuerRoutingModule,
    SharedModule,
    MatListModule,
    MatRadioModule,
    NgbModalModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    Ng2TelInputModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [MatDialogModule],
  bootstrap: [AddDesignComponent]
})
export class IssuerModule {}
