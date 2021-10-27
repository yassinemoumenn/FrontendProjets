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
  OnInit,
  Output
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { SignerModel } from 'src/app/modules/signer/Signer.model';

@Component({
  selector: 'app-view-signers',
  templateUrl: './view-signers.component.html',
  styleUrls: ['./view-signers.component.scss'],
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
export class ViewSignersComponent extends DumbComponent {
  signersDataSource!: MatTableDataSource<SignerModel>;
  @Input() set signers(data: SignerModel[] | undefined) {
    this.signersDataSource = new MatTableDataSource(data);
  }

  columns: { def: string; show: boolean }[] = [
    { def: 'select', show: true },
    { def: 'signerID', show: true },
    { def: 'signer', show: true },
    { def: 'birthday', show: true },
    { def: 'phone', show: true },
    { def: 'status', show: false },
    { def: 'actions', show: true }
  ];

  isShow: boolean = false;

  numRowsSelected: number = 0;
  btnDeleteSelectedDisabled: boolean = false;

  selection = new SelectionModel<any>(true, []);

  @Output()
  optionSelectedFilter: EventEmitter<string> = new EventEmitter();

  @Output()
  _applySearch: EventEmitter<string> = new EventEmitter();

  @Output() openDialiogToEdit: EventEmitter<{ data: any }> = new EventEmitter();

  @Output() openDialiogToDelete: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() openDialiogToAssignCategory: EventEmitter<{ data: any }> =
    new EventEmitter();

  @Output() openDialiogToDeleteSelectedItems: EventEmitter<{ data: any }> =
    new EventEmitter();

  constructor() {
    super();
  }

  applySearch(search: string) {
    this.selection.clear();
    this.ShowHiddenBloc();
    this._applySearch.emit(search);
  }

  edit(signer) {
    if (signer) this.openDialiogToEdit.emit({ data: signer });
  }

  delete(signer) {
    if (signer) this.openDialiogToDelete.emit({ data: signer });
  }

  deleteSelectedItems(e) {
    if (e && this.selection.selected) {
      this.openDialiogToDeleteSelectedItems.emit({
        data: this.selection.selected
      });
    }
  }

  //Bloc for Checkbox Inside DataTable
  IsAllSelected() {
    const numSelected = this.selection.selected.length;

    const numRows = this.signersDataSource.data.length;

    let difference = this.signersDataSource.data.filter((item) =>
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
    this.selection.select(...this.signersDataSource.data.map((id) => id.id));
    this.ShowHiddenBloc();
  }

  SignerChecked(signer) {
    if (signer) this.selection.toggle(signer.id);
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
