import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { certificateModel, CertificateStatus } from '../certificate.model';

@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCertificateComponent extends DumbComponent {
  //Certificate data
  @Input() certificateData$!: Observable<certificateModel[]>;
  @Input() dialog!: MatDialog;
  // State Filter
  filterStateCertificate: Array<string> = [
    'All',
    CertificateStatus.CREATED,
    CertificateStatus.SIGNED,
    CertificateStatus.ISSUED,
    CertificateStatus.REVOKED,
    CertificateStatus.EXPIRED,
    CertificateStatus.REJECTED
  ];
  //Columns of view certificate table
  columnsViewCertificate: Array<string> = [
    'Recipient',
    'Category',
    'Design',
    'Signers',
    'status',
    'Actions'
  ];
  //Certificate Id to revoke
  certificateID: string = '';

  //selection
  selection = new SelectionModel<any>(true, []);
  btnDeleteSelectedDisabled: boolean = false;
  isShow: boolean = false;
  numRowsSelected: number = 0;
  certificate!: certificateModel;
  certificateToshow!: certificateModel;
  //paginator
  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }
  //function that emit revoke form
  @Output() revokeClicked = new EventEmitter();
  //function that emit delete certificate
  @Output() deleteClicked = new EventEmitter();
  //function that emit filter element
  @Output()
  optionSelectedFilterViewCertificate: EventEmitter<string> = new EventEmitter();
  //function that emit search element

  @Output()
  applySearchViewCertificate: EventEmitter<string> = new EventEmitter();
  constructor() {
    super();
  }

  /**
   * Emit revoke form to the parent
   *
   * @param reason - Reason of revoking certificate selected
   * @returns void
   */
  OnRevokeClicked({ reason }: { reason: FormGroup }) {
    this.revokeClicked.emit({ reason, certificateID: this.certificateID });
  }
  /**
   * Emit delete certificate to the parent
   *
   * @param certificateID - certificateID of certificate selected
   * @returns void
   */
  OnDeleteClicked(certificateID) {
    this.deleteClicked.emit({ certificateID });
  }
  /**
   * Open modal of revoke certificate
   *
   * @param revokeContent - Content to open of revoke certificate
   * @param certificateID - certificate id selected
   * @returns void
   */
  openRevokeDialog(revokeContent, certificateID) {
    this.dialog.open(revokeContent, {
      width: '40%'
    });
    this.certificateID = certificateID;
  }
  /**
   * Open modal of view certificate
   *
   * @param viewContent - Content to open of view certificate
   * @param certificate - certificate data to display
   * @returns void
   */
  openViewDialog(viewContent, certificate) {
    this.certificateToshow = certificate;
    this.dialog.open(viewContent, {
      width: '70%',
      height: '97%'
    });
    this.certificate = certificate;
  }
  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };
  OptionSelectedFilterViewCertificate(filter: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.optionSelectedFilterViewCertificate.emit(filter);
  }
  ApplySearchViewCertificate(search: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.applySearchViewCertificate.emit(search);
  }
  ShowHiddenBloc() {
    this.btnDeleteSelectedDisabled = this.isShow =
      this.selection.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selection.selected.length;
  }
}
