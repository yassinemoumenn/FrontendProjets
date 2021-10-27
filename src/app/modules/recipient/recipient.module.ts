import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipientRoutingModule } from './recipient-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbDatepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { CRUDTableModule } from 'src/app/shared/crud-table';
import { ViewOrganizationComponent } from './listing-organizations/view-organization/view-organization.component';
import { ListingOrganizationsComponent } from './listing-organizations/listing-organizations.component';
import { RequestOrganizationComponent } from './listing-organizations/request-organization/request-organization.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { RecipientComponent } from './recipient.component';
// import { ViewCertificatesComponent } from './certificates/certificates.component';
import { ListingCertificatesComponent } from './certificates/listing-certificates/listing-certificates.component';
import { OrganizationRequestsComponent } from './organization-requests/organization-requests.component';
import { OrganizationInvitesComponent } from './organization-invites/organization-invites.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ClipboardModule } from 'ngx-clipboard';
import { ViewOrganizationInvitesComponent } from './organization-invites/view-organization-invites/view-organization-invites.component';

@NgModule({
  declarations: [
    RequestOrganizationComponent,
    RecipientComponent,
    CertificatesComponent,
    ListingCertificatesComponent,
    ViewOrganizationComponent,
    ListingOrganizationsComponent,
    OrganizationRequestsComponent,
    OrganizationInvitesComponent,
    ViewOrganizationInvitesComponent
  ],
  imports: [
    ClipboardModule,
    ShareModule,
    CommonModule,
    RecipientRoutingModule,
    SharedModule,
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
    CommonModule,
    RecipientRoutingModule,
    NgbModule,
    MatExpansionModule,
    SharedModule,
    MatInputModule
  ]
})
export class RecipientModule {}
