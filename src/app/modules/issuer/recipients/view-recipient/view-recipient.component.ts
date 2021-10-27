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
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-view-recipient',
  templateUrl: './view-recipient.component.html',
  styleUrls: ['./view-recipient.component.scss'],
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
export class ViewRecipientComponent extends DumbComponent {
  recipientsDataSource!: MatTableDataSource<any>;
  @Input() set recipients(data: any[]) {
    this.recipientsDataSource = new MatTableDataSource(data);
  }

  columns: { def: string; show: boolean }[] = [
    { def: 'select', show: true },
    { def: 'recipientID', show: false },
    { def: 'recipient', show: true },
    { def: 'phone', show: true },
    { def: 'occupation', show: true },
    { def: 'categories', show: true },

    { def: 'accountStatus', show: false },
    { def: 'actions', show: true }
  ];

  isShow: boolean = false;

  numRowsSelected: number = 0;
  btnDeleteSelectedDisabled: boolean = false;

  selection = new SelectionModel<any>(true, []);

  @Output()
  applySearch: EventEmitter<string> = new EventEmitter();

  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }

  @Input() set events(res: boolean) {
    if (res) {
      this.selection.clear();
      this.ShowHiddenBloc();
      this.paginator?.firstPage();
    }
  }

  @Output() openDialiogToEdit: EventEmitter<{ data: any }> = new EventEmitter();

  @Output() openDialiogToDelete: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() openDialiogToAssignCategory: EventEmitter<{ data: any }> =
    new EventEmitter();
  @Output() openDialiogToFullRecipientFields: EventEmitter<{
    data: any;
    category: String;
  }> = new EventEmitter();
  constructor() {
    super();
  }

  ApplySearch(search: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.applySearch.emit(search);
  }

  Edit(recipient) {
    if (recipient) this.openDialiogToEdit.emit({ data: recipient });
  }

  Delete(recipient) {
    if (recipient) this.openDialiogToDelete.emit({ data: [recipient] });
    else {
      this.openDialiogToDelete.emit({ data: this.selection.selected });
    }
  }

  AssignCategory(recipient) {
    if (recipient) this.openDialiogToAssignCategory.emit({ data: recipient });
  }

  //Bloc for Checkbox Inside DataTable
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.recipientsDataSource.data.length;
    let difference = this.recipientsDataSource.data.filter((item) =>
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
    this.selection.select(...this.recipientsDataSource.data.map((id) => id.id));
    this.ShowHiddenBloc();
  }

  RecipientChecked(recipient) {
    if (recipient) this.selection.toggle(recipient.id);
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
  fullRecipientFields(recipient, category) {
    if (recipient)
      this.openDialiogToFullRecipientFields.emit({
        data: recipient,
        category: category
      });
  }
}
