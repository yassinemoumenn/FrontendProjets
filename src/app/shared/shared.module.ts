import { ExportComponent } from './components/export/export.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SelectComponent } from './components/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputComponent } from './components/input/input.component';
import { FilterPipe } from './components/input/filter.pipe';
import { HighlightDirective } from './components/input/highlight.directive';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { shortNumberPipe } from './pipes/shortNumber.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MultipleUploadComponent } from './components/multiple-upload/multiple-upload.component';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownMenusModule } from '../partials/content/dropdown-menus/dropdown-menus.module';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { VerificationComponent } from './components/verification/verification.component';
import { ViewVerificationComponent } from './components/verification/view-verification/view-verification.component';
import { PrintCertificateComponent } from './components/print-certificate/print-certificate.component';
import { NgxPrintModule } from 'ngx-print';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CertificateViewModalComponent } from './components/certificate-view-modal/certificate-view-modal.component';
import { FullRecipientFieldsComponent } from './components/full-recipient-fields/full-recipient-fields.component';
import { VerifyCertificateDialogComponent } from './components/verification/verify-certificate-dialog/verify-certificate-dialog.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HijriDatepickerComponent } from './components/datepicker/hijri-datepicker/hijri-datepicker.component';
import { RegorianDatepickerComponent } from './components/datepicker/regorian-datepicker/regorian-datepicker.component';

@NgModule({
  declarations: [
    SnackbarComponent,
    ConfirmDialogComponent,
    EmptyListComponent,
    ButtonComponent,
    DatepickerComponent,
    SelectComponent,
    InputComponent,
    FilterPipe,
    HighlightDirective,
    CapitalizeFirstLetterPipe,
    PaginationComponent,
    FirstLetterPipe,
    SafePipe,
    shortNumberPipe,

    MultipleUploadComponent,
    ExportComponent,
    VerificationComponent,
    ViewVerificationComponent,
    PrintCertificateComponent,
    CertificateViewModalComponent,
    FullRecipientFieldsComponent,
    VerifyCertificateDialogComponent,
    HijriDatepickerComponent,
    RegorianDatepickerComponent
  ],
  imports: [
    NgbDropdownModule,
    NgxPrintModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    InlineSVGModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMatIntlTelInputModule,
    TranslateModule,
    MatMenuModule,
    MatRadioModule,
    MatProgressBarModule,
    DropdownMenusModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgbModule
  ],
  exports: [
    HighlightDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    SnackbarComponent,
    EmptyListComponent,
    ButtonComponent,
    MatButtonModule,
    SelectComponent,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    InputComponent,
    DatepickerComponent,
    SelectComponent,
    PaginationComponent,
    FirstLetterPipe,
    SafePipe,
    shortNumberPipe,
    PaginationComponent,
    MatProgressSpinnerModule,
    InlineSVGModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatSortModule,
    MatTooltipModule,
    MultipleUploadComponent,
    DropdownMenusModule,
    MatIconModule,
    MatDialogModule,
    ExportComponent,
    MatExpansionModule,
    VerificationComponent,
    ViewVerificationComponent,
    PrintCertificateComponent,
    MatChipsModule,
    MatAutocompleteModule,
    HighlightDirective,
    CertificateViewModalComponent,
    MatInputModule,
    FullRecipientFieldsComponent,
    MatRadioModule,
    CapitalizeFirstLetterPipe
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
