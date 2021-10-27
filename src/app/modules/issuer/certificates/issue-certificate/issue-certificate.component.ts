import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { CategoryModel } from '../../category/Category.model';
import { certificateModel } from '../certificate.model';

@Component({
  selector: 'app-issue-certificate',
  templateUrl: './issue-certificate.component.html',
  styleUrls: ['./issue-certificate.component.scss']
})
export class IssueCertificateComponent extends DumbComponent {
  //Columns of issue certificate
  columnsIssue: Array<string> = [
    'selectPublic',
    'selectPrivate',
    'Recipient',
    'Category',
    'Design'
  ];
  //selection
  @Input() selectionIssuePublic = new SelectionModel<any>(true, []);
  @Input() selectionIssuePrivate = new SelectionModel<any>(true, []);
  @Input() selectionCounter: number = 0;
  btnDeleteSelectedDisabled: boolean = false;
  isShow: boolean = false;
  numRowsSelected: number = 0;
  //paginator
  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }
  //certificate data
  _filteredCertificates: MatTableDataSource<certificateModel> =
    new MatTableDataSource();
  @Input() set filteredCertificates(data: certificateModel[] | undefined) {
    this._filteredCertificates = new MatTableDataSource(data);
  }

  //category filter
  @Input() category$!: Observable<CategoryModel[]>;
  //function that emit the counter of selected certificates
  @Output()
  prepareSelectedCertificates: EventEmitter<number> = new EventEmitter();
  //function that emit filter element
  @Output() optionSelectedFilterIssueCertificate: EventEmitter<string> =
    new EventEmitter();
  //function that emit search element

  @Output()
  applySearchIssueCertificate: EventEmitter<string> = new EventEmitter();
  constructor() {
    super();
  }

  IsAllSelectedPrivate() {
    const numSelected = this.selectionIssuePrivate.selected.length;
    const numRows = this._filteredCertificates.data.length;
    return numSelected === numRows;
  }
  IsAllSelectedPublic() {
    const numSelected = this.selectionIssuePublic.selected.length;
    const numRows = this._filteredCertificates.data.length;
    return numSelected === numRows;
  }
  AllCheckedPublic() {
    if (this.IsAllSelectedPublic()) {
      this.selectionIssuePublic.clear();
      return;
    }
    this.selectionIssuePublic.select(...this._filteredCertificates.data);
  }
  AllCheckedPrivate() {
    if (this.IsAllSelectedPrivate()) {
      this.selectionIssuePrivate.clear();
      return;
    }
    this.selectionIssuePrivate.select(...this._filteredCertificates.data);
  }
  networkCheckedPublic(network) {
    if (network) this.selectionIssuePublic.toggle(network);
    this.prepareSelectedCertificatesForCreditTransactions();
  }
  networkCheckedPrivate(network) {
    if (network) this.selectionIssuePrivate.toggle(network);
    this.prepareSelectedCertificatesForCreditTransactions();
  }
  CheckboxLabelPrivate(row?: any): string {
    if (!row) {
      return `${this.IsAllSelectedPrivate() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selectionIssuePrivate.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }
  CheckboxLabelPublic(row?: any): string {
    if (!row) {
      return `${this.IsAllSelectedPublic() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selectionIssuePublic.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }
  prepareSelectedCertificatesForCreditTransactions() {
    this.selectionCounter =
      this.selectionIssuePublic.selected.length +
      this.selectionIssuePrivate.selected.length;
    this.prepareSelectedCertificates.emit(this.selectionCounter);
  }
  OptionSelectedFilterIssueCertificate(filter: string) {
    this.selectionIssuePublic.clear();
    this.selectionIssuePrivate.clear();
    this.ShowHiddenBlocPrivate();
    this.ShowHiddenBlocPublic();
    this.paginator?.firstPage();
    this.optionSelectedFilterIssueCertificate.emit(filter);
  }
  ApplySearchIssueCertificate(search: string) {
    this.selectionIssuePublic.clear();
    this.selectionIssuePrivate.clear();
    this.ShowHiddenBlocPrivate();
    this.ShowHiddenBlocPublic();
    this.paginator?.firstPage();
    this.applySearchIssueCertificate.emit(search);
  }
  ShowHiddenBlocPrivate() {
    this.btnDeleteSelectedDisabled = this.isShow =
      this.selectionIssuePrivate.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selectionIssuePrivate.selected.length;
  }
  ShowHiddenBlocPublic() {
    this.btnDeleteSelectedDisabled = this.isShow =
      this.selectionIssuePublic.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selectionIssuePublic.selected.length;
  }
}
