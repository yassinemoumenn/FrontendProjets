import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';

@Component({
  selector: 'app-view-certificates',
  templateUrl: './view-certificates.component.html',
  styleUrls: ['./view-certificates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('AnimationHiddenBloc', [
      state(
        'start',
        style({
          height: '60px',
          opacity: '1'
        })
      ),
      state(
        'end',
        style({ height: '0px', border: 'none', padding: '0px', opacity: '0' })
      ),
      transition('start => end', [animate('.250s ease')]),
      transition('end => start', [animate('.250s ease')])
    ])
  ]
})
export class ViewCertificatesComponent extends DumbComponent {
  @Input() certificates!: any[];

  // For checkbox inside DataTable
  selection = new SelectionModel<any>(true, []);
  checkboxIsShow: boolean = false;
  isShow: boolean = false;
  numRowsSelected: number = 0;
  btnsSelectedDisabled: boolean = false;
  signDisabled: boolean = false;

  columns = [
    { def: 'select', show: this.checkboxIsShow },
    { def: 'recipient', show: true },
    { def: 'category', show: true },
    { def: 'progress', show: true },
    { def: 'status', show: true },
    { def: 'actions', show: true }
  ];
  //Certificate Id to reject
  certificateID: string = '';
  @Input() dialog!: MatDialog;
  @Output()
  optionSelectedFilter: EventEmitter<string> = new EventEmitter();

  @Output()
  applySearch: EventEmitter<string> = new EventEmitter();

  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }

  @Input() status: string[] = [];

  @Input() set events(e: Observable<boolean>) {
    e.subscribe((data) => {
      if (data) {
        this.selection.clear();
        this.ShowHiddenBloc();
      }
    });
  }

  @Input() ConnectedUser?: any;

  @Output() signCertificate = new EventEmitter<string>();
  @Output() unSignCertificate = new EventEmitter<string>();
  @Output() rejectClicked = new EventEmitter();
  @Output() sortDataEvent = new EventEmitter<Sort>();

  @Output() signCertificates = new EventEmitter<any>();
  @Output() unSignCertificates = new EventEmitter<any>();
  @Output() viewCertificates = new EventEmitter<any>();

  constructor() {
    super();
  }

  SignCertificate(certificateID) {
    this.signCertificate.emit(certificateID);
  }

  UnSignCertificate(certificateID) {
    this.unSignCertificate.emit(certificateID);
  }
  openRejectDialog(rejectContent, certificateID) {
    this.dialog.open(rejectContent, {
      width: '40%'
    });
    this.certificateID = certificateID;
  }
  OnRejectClicked({ reason }) {
    this.rejectClicked.emit({ reason, certificateID: this.certificateID });
  }

  ViewCertificate(certificate) {
    this.viewCertificates.emit(certificate);
  }

  OptionSelectedFilter(filter: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();

    if (
      filter.trim().toLowerCase() === 'created' ||
      filter.trim().toLowerCase() === 'signed'
    ) {
      this.checkboxIsShow = true;
      this.signDisabled = filter.trim().toLowerCase() !== 'created';
    } else this.checkboxIsShow = false;
    this.GetDisplayedColumns();

    this.optionSelectedFilter.emit(filter);
  }

  ApplySearch(search: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.applySearch.emit(search);
  }

  sortData(sort: any) {
    this.sortDataEvent.emit(sort);
  }

  GetDisplayedColumns() {
    this.columns[0].show = this.checkboxIsShow;
    return this.columns.filter((col) => col.show).map((col) => col.def);
  }

  SignCertificates(e) {
    if (e && this.selection.selected) {
      this.signCertificates.emit(this.selection.selected);
    }
  }
  UnSignCertificates(e) {
    if (e && this.selection.selected) {
      this.unSignCertificates.emit(this.selection.selected);
    }
  }

  //Bloc for Checkbox Inside DataTable
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.certificates.length;

    let difference = this.certificates.filter((item) =>
      this.selection.selected.every((selected) => !selected.includes(item.id))
    );
    return numSelected >= numRows && difference.length === 0;
  }

  AllChecked() {
    if (this.IsAllSelected()) {
      this.selection.clear();
      this.ShowHiddenBloc();
      return;
    }
    this.selection.select(...this.certificates.map((id) => id.id));
    this.ShowHiddenBloc();
  }

  CertificateChecked(subIssuer) {
    if (subIssuer) this.selection.toggle(subIssuer);
    this.ShowHiddenBloc();
  }

  CheckboxLabel(row?: any): string {
    if (!row) {
      return `${this.IsAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  ShowHiddenBloc() {
    this.btnsSelectedDisabled = this.isShow =
      this.selection.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selection.selected.length;
  }

  progress(certificate: certificateModel): string {
    if (
      certificate.signers &&
      certificate.signers?.length > 0 &&
      certificate.category.signers
    ) {
      let percent =
        (certificate.signers?.length * 100) /
        certificate.category.signers?.length;

      return percent.toString();
    } else {
      return '0';
    }
  }
}
