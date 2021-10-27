import { ListingOrganizationssService } from './../listing-organizationss.service';

import { FormGroup, FormControl } from '@angular/forms';
import { CategoryModel } from './../../../issuer/category/Category.model';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { GroupModel, Organization } from 'src/app/models/Organization';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-request-organization',
  templateUrl: './request-organization.component.html',
  styleUrls: ['./request-organization.component.scss']
})
export class RequestOrganizationComponent extends DumbComponent {
  // implements AfterViewInit

  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() organizations: Organization[] = [];
  @Input() organizationsName: string[] = [];
  @Input() groups: GroupModel[] = [];
  @Input() groupsName: string[] = [];
  @Input() categories: CategoryModel[] = [];
  @Input() categoriesName: any[] = [];
  @Input() organizationType: string = '';
  @Input() ListOrganizations: any[] = [];
  @Input() listGroups!: GroupModel[];
  @Input() listCategories!: CategoryModel[];
  @Input() listOrganization!: any[];
  @Input() DATA!: any[];
  @Input() RecipientOrganizations!: any[];
  @Input() IssuerOrganization!: any[];
  @Input() GetListOfCategories!: any[];
  issuer;
  isloading = false;
  requestForm: FormGroup = new FormGroup({});

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);

  @Output() requestOrganization = new EventEmitter();
  @Output() groupID = new EventEmitter();

  constructor() {
    super();
  }

  @Input() set _requestFrom(formGroup: FormGroup) {
    this.requestForm = formGroup;
  }

  public get Organization(): FormControl {
    return this.requestForm.get('organizationControl') as FormControl;
  }

  public get Group(): FormControl {
    return this.requestForm.get('groupControl') as FormControl;
  }

  public get Category(): FormControl {
    return this.requestForm.get('categoryControl') as FormControl;
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }

  submitForm() {
    this.requestOrganization.emit(this.requestForm);
  }
  myGroups: any[] = [];
  selectOrganization(orgName) {
    debugger;
    // let cc = this.DATA.find((x) => x.organizationInfo.Id === );
    this.myGroups = orgName.organizationGroups;
  }
  myCategories;
  selectGroup(groupID) {
    debugger;
    //  this.myCategories = groupName.categories;
    this.groupID.emit(groupID.id);
    console.log('GetListOfCategories', this.GetListOfCategories);
  }

  findOrganizationByName(orgName) {
    let orgCopy = this.organizations.slice();

    let organization = orgCopy.find(
      (organization) => organization.name === orgName
    );
    return organization;
  }

  findGroupByName(groupNAme) {
    let grpCopy = this.groups.slice();

    let group = grpCopy.find((group) => group.name === groupNAme);
    return group;
  }

  findCategoryByName(CategoryName) {
    let catCopy = this.categories.slice();

    let category = catCopy.find((category) => category.name === CategoryName);
    return category;
  }
}
