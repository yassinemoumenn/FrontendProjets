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
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { AffiliationDetails } from 'src/app/models/User';
import { CategoryModel } from 'src/app/modules/issuer/category/Category.model';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';

@Component({
  selector: 'app-view-recipients',
  templateUrl: './view-recipients.component.html',
  styleUrls: ['./view-recipients.component.scss'],
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
    ]),
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', padding: '0' })
      ),
      state('expanded', style({ height: '*', padding: '10px' })),
      transition(
        'expanded <=> collapsed',
        animate('.250s cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ViewRecipientsComponent extends DumbComponent {
  recipientsDataSource!: MatTableDataSource<RecipientModel>;
  @Input() set recipients(data: RecipientModel[]) {
    this.recipientsDataSource = new MatTableDataSource(data);
  }

  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }

  @Input() set events(e: Observable<boolean>) {
    e.subscribe((res) => {
      if (res) {
        this.selection.clear();
        this.isShow = true;
        this.ShowHiddenBloc();
      }
    });
  }

  groups?: AffiliationDetails[] = [];

  _categories: CategoryModel[] = [];

  columns: { def: string; show: boolean }[] = [
    { def: 'select', show: true },
    { def: 'show-details', show: true },
    { def: 'recipientID', show: false },
    { def: 'recipient', show: true },
    { def: 'phone', show: true },
    { def: 'birthday', show: true },
    { def: 'occupation', show: true },
    { def: 'accountStatus', show: false },
    { def: 'actions', show: true }
  ];

  expandedRecipient: RecipientModel | null = null;

  clickedOrg: string = '';
  clickedGrp: string = '';

  panelOpenState = false;
  panelOpenStateGr = false;

  orgClicked = '';

  isShow: boolean = false;

  numRowsSelected: number = 0;
  btnDeleteSelectedDisabled: boolean = false;

  selection = new SelectionModel<any>(true, []);

  @Output()
  applySearch: EventEmitter<string> = new EventEmitter();

  @Output() openDialiogToEdit: EventEmitter<{ data: any }> = new EventEmitter();

  @Output() openDialiogToDelete: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() openDialiogToAssignCategory: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() openDialiogToDeleteSelectedItems: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() getGroupsByOrg: EventEmitter<string> = new EventEmitter();
  @Output() getCategoriesByGroup: EventEmitter<string> = new EventEmitter();
  @Output() getGroups: EventEmitter<string> = new EventEmitter();
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
    if (recipient) this.openDialiogToDelete.emit({ data: recipient });
  }

  fullRecipientFields(recipient, category) {
    if (recipient)
      this.openDialiogToFullRecipientFields.emit({
        data: recipient,
        category: category
      });
  }

  AssignCategory(recipient) {
    if (recipient) this.openDialiogToAssignCategory.emit({ data: [recipient] });
    else if (recipient === undefined && this.selection.selected) {
      this.openDialiogToAssignCategory.emit({ data: this.selection.selected });
    }
  }
  DeleteSelectedItems(e) {
    if (e && this.selection.selected) {
      this.openDialiogToDeleteSelectedItems.emit({
        data: this.selection.selected
      });
    }
  }

  GetGroups(_org, recipient: RecipientModel) {
    this.groups = [];
    this.clickedGrp = '';
    this._categories = [];
    this.clickedOrg = _org.organization.id;
    this.groups = recipient.groups
      .filter((grp) => grp.organization.id === this.clickedOrg)
      .map((recip) => recip.group);
  }

  GetCategories(grp, recipient: RecipientModel) {
    this._categories = [];
    this.clickedGrp = grp;

    this._categories = recipient.categories.filter(
      (cat) => cat.group.id === this.clickedGrp
    );
  }

  //Bloc for Checkbox Inside DataTable
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.recipientsDataSource.data.length;
    let difference = this.recipientsDataSource.data.filter((item) =>
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
    this.selection.select(...this.recipientsDataSource.data);
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
}
