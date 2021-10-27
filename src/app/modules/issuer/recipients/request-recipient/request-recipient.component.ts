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
import { MatTableDataSource } from '@angular/material/table';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';

@Component({
  selector: 'app-request-recipient',
  templateUrl: './request-recipient.component.html',
  styleUrls: ['./request-recipient.component.scss'],
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
export class RequestRecipientComponent extends DumbComponent {
  recipientRequestsDataSource: MatTableDataSource<any> =
    new MatTableDataSource();
  @Input() set recipientRequests(data: any[]) {
    this.recipientRequestsDataSource = new MatTableDataSource(data);
  }

  @Input() isLoadingRequest: boolean = false;

  @Output() paginatonPaged: EventEmitter<any> = new EventEmitter();

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() acceptRecipient: EventEmitter<{
    recipient: RecipientModel;
    ids: string[];
  }> = new EventEmitter();
  @Output() rejectRecipient: EventEmitter<{
    recipient: RecipientModel;
    ids: string[];
  }> = new EventEmitter();

  columns: { def: string; show: boolean }[] = [
    { def: 'select', show: false },
    { def: 'recipientID', show: false },
    { def: 'recipient', show: true },
    { def: 'phone', show: true },
    { def: 'occupation', show: true },
    { def: 'type', show: true },
    { def: 'actions', show: true }
  ];

  isShow: boolean = false;

  numRowsSelected: number = 0;
  btnDeleteSelectedDisabled: boolean = false;

  selection = new SelectionModel<any>(true, []);

  @Output()
  getRecipientById: EventEmitter<string> = new EventEmitter();

  checkedList: string[] = [];
  checkedListReject: string[] = [];

  constructor() {
    super();
  }

  CategoryChecked(id, checked) {
    if (checked) {
      this.checkedList.push(id);
    } else {
      let index = this.checkedList.indexOf(id);
      this.checkedList.splice(index, 1);
    }
  }

  CategoryChecked_Reject(id, checked) {
    if (checked) {
      this.checkedListReject.push(id);
    } else {
      let index = this.checkedListReject.indexOf(id);
      this.checkedListReject.splice(index, 1);
    }
  }

  AcceptRecipient(obj) {
    if (obj && this.checkedList.length > 0) {
      this.acceptRecipient.emit({
        recipient: obj,
        ids: this.checkedList
      });
      this.checkedList.splice(0);
    }
  }

  RejectRecipient(obj) {
    if (obj && this.checkedList.length > 0) {
      this.rejectRecipient.emit({
        recipient: obj,
        ids: this.checkedList
      });
      this.checkedList.splice(0);
    }
  }

  OnPaginatonPaged(e) {
    if (e) this.paginatonPaged.emit(e);
  }

  //Bloc for Checkbox Inside DataTable
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.recipientRequestsDataSource.data.length;
    let difference = this.recipientRequestsDataSource.data.filter((item) =>
      this.selection.selected.every(
        (selected) => !selected.id.includes(item.id)
      )
    );
    return numSelected >= numRows && difference.length === 0;
  }

  AllChecked() {
    if (this.IsAllSelected()) {
      this.selection.clear();
      this.ShowHiddenBloc();
      return;
    }
    this.selection.select(...this.recipientRequestsDataSource.data);
    this.ShowHiddenBloc();
  }

  RecipientChecked(recipient) {
    if (recipient) this.selection.toggle(recipient);
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
    this.btnDeleteSelectedDisabled = this.isShow =
      this.selection.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selection.selected.length;
  }

  GetDisplayedColumns(): string[] {
    return this.columns.filter((col) => col.show).map((col) => col.def);
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
