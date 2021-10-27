import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { CategoryModel } from '../../category/Category.model';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCertificateComponent extends DumbComponent {
  //Recipient Data
  RecipientDataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() set RecipientData(data: any) {
    this.RecipientDataSource = new MatTableDataSource(data);
  }
  columnsAddCertificate: Array<string> = ['Recipient', 'Email', 'Phone'];
  //paginator
  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }
  //Selection
  @Input() selection = new SelectionModel<any>(true, []);
  btnDeleteSelectedDisabled: boolean = false;
  isShow: boolean = false;
  numRowsSelected: number = 0;
  //Category filter
  @Input() category$!: Observable<CategoryModel[]>;
  //function that emit filter element
  @Output() optionSelectedFilterAddCertificate: EventEmitter<string> =
    new EventEmitter();
  //function that emit search element
  @Output()
  applySearchAddCertificate: EventEmitter<string> = new EventEmitter();
  constructor() {
    super();
  }
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.RecipientDataSource.data.length;
    return numSelected === numRows;
  }
  AllChecked() {
    if (this.IsAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.RecipientDataSource.data);
  }
  RecipientChecked(recipient) {
    if (recipient) this.selection.toggle(recipient);
  }
  CheckboxLabel(row?: any): string {
    if (!row) {
      return `${this.IsAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  OptionSelectedFilterAddCertificate(filter: string) {
    this.columnsAddCertificate = ['select', 'Recipient', 'Email', 'Phone'];
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.optionSelectedFilterAddCertificate.emit(filter);
  }
  ApplySearchAddCertificate(search: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.applySearchAddCertificate.emit(search);
  }
  ShowHiddenBloc() {
    this.btnDeleteSelectedDisabled = this.isShow =
      this.selection.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selection.selected.length;
  }
}
