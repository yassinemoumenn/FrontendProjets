import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { CategoryModel } from 'src/app/modules/issuer/category/Category.model';
import { IssuerOrganization } from 'src/app/modules/Organization/models/IssuerOrganization';

@Component({
  selector: 'app-assign-categories',
  templateUrl: './assign-categories.component.html',
  styleUrls: ['./assign-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignCategoriesComponent extends DumbComponent {
  @Input() recipientIDs: string[] = [];

  organizationsDataSource: MatTableDataSource<IssuerOrganization> =
    new MatTableDataSource();
  @Input() set organizations(data: IssuerOrganization[] | null) {
    this.organizationsDataSource = new MatTableDataSource(data ?? undefined);
  }

  groupsDataSource: MatTableDataSource<{ id: string; name: string }> =
    new MatTableDataSource();

  categoriesDataSource: MatTableDataSource<CategoryModel> =
    new MatTableDataSource();
  _categories!: CategoryModel[];
  @Input() set categories(data: ResponseObject<CategoryModel[]> | null) {
    if (data) {
      if (this.clickedGrp !== '') {
        this._categories = data.data;
        this.categoriesDataSource = new MatTableDataSource(this._categories);
      } else {
        this.categoriesDataSource.data = [];
      }
    }
  }

  @Output() getCategories: EventEmitter<string> = new EventEmitter();

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() assignCategory: EventEmitter<{
    ids: string[];
    categories: any[];
  }> = new EventEmitter();

  isLoading: boolean = false;

  searchOrg: string = '';
  searchGrp: string = '';
  searchCat: string = '';

  clickedOrg: string = '';
  clickedGrp: string = '';

  checkedCats: string[] = [];
  constructor() {
    super();
  }

  SaveChange() {
    this.assignCategory.emit({
      ids: this.recipientIDs,
      categories: this.checkedCats
    });
  }

  SearchOrganization(e) {
    this.clickedOrg = '';
    this.groupsDataSource.data = [];
    this.categoriesDataSource.data = [];
    this.organizationsDataSource.filterPredicate = (data, filter: string) =>
      data.name
        .trim()
        .toLocaleLowerCase()
        .includes(filter.trim().toLocaleLowerCase());
    if (e && e !== '') {
      this.organizationsDataSource.filter = e.trim().toLowerCase();
      return;
    }
    this.organizationsDataSource.filteredData =
      this.organizationsDataSource.data;
  }

  ClickedOrganization(org) {
    this.groupsDataSource.data = [];
    this.categoriesDataSource.data = [];
    this.clickedOrg = org.id;
    this.clickedGrp = '';
    this.checkedCats.splice(0);
    let groups = this.organizationsDataSource.data.find(
      (cat) => cat.id === this.clickedOrg
    )?.organizationGroups as any;
    this.groupsDataSource = new MatTableDataSource(groups);
  }

  SearchGroup(e) {
    this.clickedGrp = '';
    this.categoriesDataSource.data = [];
    this.checkedCats.splice(0);
    this.groupsDataSource.filterPredicate = (data, filter: string) =>
      data.name
        .trim()
        .toLocaleLowerCase()
        .includes(filter.trim().toLocaleLowerCase());
    if (e && e !== '') {
      this.groupsDataSource.filter = e.trim().toLowerCase();
      return;
    }
    this.groupsDataSource.filteredData = this.groupsDataSource.data;
  }

  ClickedGroup(grp) {
    this._categories = [];
    this.categoriesDataSource.data = [];
    this.clickedGrp = grp;
    this.checkedCats.splice(0);
    this.getCategories.emit(this.clickedGrp);
  }

  SearchCategory(e) {
    let arrayOfCats: string[] = [];
    this.categoriesDataSource.filterPredicate = (data, filter: string) =>
      data.name
        .trim()
        .toLocaleLowerCase()
        .includes(filter.trim().toLocaleLowerCase());
    if (e && e !== '') {
      this.categoriesDataSource.filter = e.trim().toLowerCase();
      this.categoriesDataSource.filteredData.forEach((_cat) => {
        let index = this.checkedCats.indexOf(_cat.id ?? '');
        if (index >= 0) {
          arrayOfCats.push(_cat.id ?? '');
        }
      });
      this.checkedCats.splice(0);
      this.checkedCats = [...this.checkedCats, ...arrayOfCats];
      return;
    }
    this.categoriesDataSource.filteredData = this.categoriesDataSource.data;
  }

  CatChecked(catId, checked) {
    if (checked && this.checkedCats.indexOf(catId) === -1) {
      this.checkedCats.push(catId);
    } else {
      let indexToDelete = this.checkedCats.indexOf(catId);
      this.checkedCats.splice(indexToDelete, 1);
    }
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
