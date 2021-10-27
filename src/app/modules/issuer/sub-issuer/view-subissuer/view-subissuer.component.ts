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
  selector: 'app-view-subissuer',
  templateUrl: './view-subissuer.component.html',
  styleUrls: ['./view-subissuer.component.scss'],
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
export class ViewSubissuerComponent extends DumbComponent {
  // Get All Sub Issuers From Smart Component
  subIssuersDataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() set subIssuers(data: any) {
    this.subIssuersDataSource = new MatTableDataSource(data);
  }
  paginator: any;
  @Input() set _paginator(matPaginator: MatPaginator | null) {
    this.paginator = matPaginator;
  }
  // Get All Positions From Smart Component To Fill The Select Filter
  allPositions: string[] = [];
  @Input() set positions(positions: string[]) {
    positions.unshift('All');
    this.allPositions = positions;
  }

  // Columns Of DataTable
  columns: string[] = [
    'select',
    'SubIssuerId',
    'SubIssuer',
    'Phone',
    'Position',
    'Actions'
  ];

  // For checkbox inside DataTable
  selection = new SelectionModel<any>(true, []);

  //True to show the hidden bloc and false to hide it
  isShow: boolean = false;

  numRowsSelected: number = 0;
  btnDeleteSelectedDisabled: boolean = false;

  @Output() openDialiogToEdit: EventEmitter<{ data: any }> = new EventEmitter();

  @Output() openDialiogToDelete: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() openDialiogToDeleteSelectedItems: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output()
  optionSelectedFilter: EventEmitter<string> = new EventEmitter();

  @Output()
  applySearch: EventEmitter<string> = new EventEmitter();

  constructor() {
    super();
  }

  OptionSelectedFilter(filter: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.optionSelectedFilter.emit(filter);
  }

  ApplySearch(search: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this.paginator?.firstPage();
    this.applySearch.emit(search);
  }

  Edit(subissuer) {
    if (subissuer) this.openDialiogToEdit.emit({ data: subissuer });
  }

  Delete(subissuer) {
    if (subissuer) this.openDialiogToDelete.emit({ data: subissuer });
  }

  DeleteSelectedItems(e) {
    if (e && this.selection.selected) {
      this.openDialiogToDeleteSelectedItems.emit({
        data: this.selection.selected
      });
    }
  }

  //Bloc for Checkbox Inside DataTable
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.subIssuersDataSource.data.length;
    let difference = this.subIssuersDataSource.data.filter((item) =>
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
    this.selection.select(...this.subIssuersDataSource.data);
    this.ShowHiddenBloc();
  }

  SubIssuerChecked(subIssuer) {
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
    this.btnDeleteSelectedDisabled = this.isShow =
      this.selection.selected.length > 0 ? true : false;
    this.numRowsSelected = this.selection.selected.length;
  }
}
