import { IAddress } from 'src/app/models/User';
// import { DATA } from './../listing-organizations.component';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { GroupModel } from 'src/app/models/Organization';
import { CategoryModel } from 'src/app/modules/issuer/category/Category.model';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { MatTableDataSource } from '@angular/material/table';
export interface listGroup {
  groupId: string;
  groupName: string;
  categories: CategoryModel[];
}

export interface myOrganization {
  Id: string;
  Name: string;
  Statu: string;
}
export interface DATA {
  organizationInfo: myOrganization;
  group: listGroup[];
}
@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss']
})
export class ViewOrganizationComponent extends DumbComponent {
  // implements AfterViewInit
  @Input() displayedRows$!: any[];
  @Input() organizationCategories!: any[];

  @Input() listGroups!: GroupModel[];
  @Input() listCategories!: CategoryModel[];
  @Input() listOrganization!: any[];
  @Input() Group$!: Observable<ResponseObject<GroupModel[]>>[];
  @Output() openDialiogToFullRecipientFields: EventEmitter<{
    data: any;
    category: String;
  }> = new EventEmitter();
  @Input() DATA: any;
  datasource!: any;

  @Output() EditCategoryFilds = new EventEmitter();

  public columns = ['id', 'name', 'groups'];

  constructor() {
    super();
  }
  edit(org) {
    this.EditCategoryFilds.emit(org);
  }

  fullRecipientFields(category) {
    this.openDialiogToFullRecipientFields.emit({
      data: category,
      category: category
    });
  }
}
