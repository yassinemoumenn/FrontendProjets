import { AuthenticationService } from './../../auth/authentication.service';
import { CategoryService } from './../../issuer/category/category.service';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { CategoryModel } from './../../issuer/category/Category.model';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { ListingOrganizationssService } from './listing-organizationss.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { IAccountSettings, IAddress, IPhone } from 'src/app/models/User';
import { GroupModel, Organization } from 'src/app/models/Organization';
import { first } from 'rxjs/operators';

export interface listGroup {
  groupId: string;
  groupName: string;
  categories: CategoryModel[];
}

export interface myOrganization {
  Id: String;
  Name: String;
  statu: string;
}
export interface DATA {
  organizationInfo: myOrganization;
  group: listGroup[];
}
@Component({
  selector: 'app-listing-organizations',
  templateUrl: './listing-organizations.component.html',
  styleUrls: ['./listing-organizations.component.scss']
})
export class ListingOrganizationsComponent
  extends SmartComponent
  implements OnInit, OnDestroy {
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('request') requestTemplate: any;
  @ViewChild('templateFullRecipientsFields') templateFullRecipientsFields: any;
  listGroups: any[] = [];
  listOrganization: any[] = [];
  listCategories: CategoryModel[] = [];
  courantUser!: any;

  sb = this.userService.currentUserSubject
    .asObservable()
    .pipe(first((user) => !!user))
    .subscribe((user) => {
      // let obj: User;
      this.courantUser = Object.assign({}, user);
      console.log(this.courantUser);
    });
  recipientDataToFull: any;
  listOfOrganizations: any[] = [];
  RecipientOrganizations: any[] = [];
  IssuerOrganization: any[] = [];
  titel!: string;

  fm!: FormGroup;
  organizations: Organization[] = [];
  organizationsNames: string[] = [];
  // groups: GroupModel[] = [];
  groupsNames: string[] = [];
  categories: CategoryModel[] = [];
  categoriesName: string[] = [];
  organizationCategories: object[] = [];
  //recipientOrganizations: Organization[] = [];
  isLoading = true;
  subscriptions: Subscription[] = [];
  user;

  Fieldname!: string;
  dynamicForm: any = FormGroup;
  constructor(
    private _organizationservice: ListingOrganizationssService,
    private dialog: MatDialog,
    private categoryservice: CategoryService,
    private userService: AuthenticationService,
    private formbuilder: FormBuilder
  ) {
    super();

    this.dynamicForm = this.formbuilder.group({
      properties: this.formbuilder.array([])
    });
  }

  phone!: IPhone;
  adress!: IAddress;
  AccountSetting!: IAccountSettings;
  Groups: GroupModel[] = [];
  my_certificates: Organization[] = [];

  public pageIndex: number = 0;
  public pageSize: number = 5;
  public length!: number;

  OptionSelectedFilter(filter) {
    this._organizationservice.Filter(
      this.organizations,
      filter,
      this.pageIndex,
      this.pageSize
    );

    this.displayedRows$ = this._organizationservice.Filter(
      this.organizations,
      filter,
      this.pageIndex,
      this.pageSize
    );
  }

  ApplySearch(filter) {
    if (filter !== undefined) {
      this.displayedRows$ = this._organizationservice.Search(
        this.DATA,
        filter,
        this.pageIndex,
        this.pageSize
      );
    } else {
      this.displayedRows$ = this.getOrganizationsPgonation(
        this.pageIndex,
        this.pageSize
      );
    }
  }

  nbrElementinPage = 5;
  displayedRows$!: any[];

  getOrganizationsPgonation(pageIndex, pageSize) {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = this.DATA[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return ListE;
  }

  pagination({ pageEvent }: { pageEvent: any }) {
    this.pageIndex = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;

    this.displayedRows$ = this.getOrganizationsPgonation(
      pageEvent.pageIndex,
      pageEvent.pageSize
    );
  }
  uniqueArray2(arr: any[]) {
    let a: any[] = [];
    for (let i = 0, l = arr.length; i < l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '') a.push(arr[i]);
    return a;
  }
  DATA: DATA[] = [];

  Group$: Observable<ResponseObject<GroupModel[]>>[] = [];
  ngOnInit(): void {
    this.listCategories = this.courantUser.categories;
    this.courantUser.groups!.forEach((element) => {
      this.listOrganization.push({
        id: element.organization.id,
        name: element.organization.name,
        statu: element.accountState
      });

      this.listGroups.push(element);
    });

    this.listOrganization = this.uniqueArray2(this.listOrganization);

    let data: DATA;
    this.listOrganization.forEach((element) => {
      let orgInf: myOrganization = {
        Id: element.id + '',
        Name: element.name,
        statu: element.statu
      };

      let groupsOrg: listGroup[] = [];
      let data: DATA = {
        organizationInfo: orgInf,
        group: groupsOrg
      };
      let groupCategories: any[] = [];
      this.listGroups.forEach((grp) => {
        this.listCategories.forEach((cat) => {
          groupCategories.push(cat);
        });
        let G: listGroup = {
          groupId: grp.group.id!,
          groupName: grp.group.name!,
          categories: groupCategories
        };
        groupsOrg.push(G);
      });

      this.DATA.push(data);
    });

    this.length = this.DATA.length;
    this.displayedRows$ = this.getOrganizationsPgonation(
      this.pageIndex,
      this.pageSize
    );

    this._organizationservice.GetRecipientOrganizations().subscribe((res) => {
      let cc = res;
      this.RecipientOrganizations = res.data;
    });
    this._organizationservice.GetIssuerOrganizations().subscribe((res) => {
      let cc = res.data;
      this.IssuerOrganization = res.data;

      console.log('issuerOrganization', this.IssuerOrganization);
    });
  }

  GetListOfCategories: any[] = [];
  GetCatergoryBygroupID(e) {
    debugger;
    this._organizationservice.GetCatergoryBygroupID(e).subscribe((res) => {
      this.GetListOfCategories = res.data;
      console.log('GetListOfCategories', res.data);
    });
  }

  OpenDialogToFullRecipientFields = (e) => {
    this.recipientDataToFull = e;
    let dialogRef = this.dialog.open(this.templateFullRecipientsFields, {
      width: '70%'
    });
  };
  fullRecipientFields(event) {
    this._organizationservice.updateCategories(event).subscribe(() => {});
    this.dialog.closeAll();
  }
  organizationType!: string;
  OpenDialogAdd = (orgTyp) => {
    this.organizationType = orgTyp;
    if (orgTyp === 'issuer') {
      this.listOfOrganizations = this.IssuerOrganization;
      this.titel = 'Request issuer-organization';
      this.fm = new FormGroup({
        organizationControl: new FormControl('', Validators.required),
        groupControl: new FormControl('', Validators.required),
        categoryControl: new FormControl('', Validators.required)
      });
    }
    if (orgTyp === 'recipient') {
      this.listOfOrganizations = this.RecipientOrganizations;
      this.titel = 'Request recipient-organization';
      this.fm = new FormGroup({
        organizationControl: new FormControl('', Validators.required),
        groupControl: new FormControl(''),
        categoryControl: new FormControl('')
      });
    }
    this.dialog.open(this.requestTemplate, {
      panelClass: ['padding-0'],
      width: '50%',
      disableClose: true
    });
  };

  requestOrganization(org) {
    if (this.organizationType === 'issuer') {
      this._organizationservice.sendRequestToIssuerOrganization(org);
    }
    if (this.organizationType === 'recipient') {
      this._organizationservice
        .sendRequestToRecipientOrganization(org)
        .subscribe((res) => {});
    }
    this.Dismiss(true);
  }

  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };

  init() {
    const sb = this.userService.currentUserSubject
      .asObservable()
      .subscribe((user) => {
        this.user = Object.assign({}, user);
      });
    this.subscriptions.push(sb);

    // get ALL organizations
    // const sb2 = this._organizationservice
    //   .ListOrganization()
    //   .subscribe((res: ResponseObject<Organization[]>) => {
    //     this.organizations = res.data;
    //     let orgsCopy = this.organizations.slice();
    //     this.organizationsNames = orgsCopy.map((x) => x.name);
    //     let affiliattions = this.user.affiliations;
    //     // get recipient organizations
    //     affiliattions.forEach((affiliation) => {
    //       this.organizations.forEach((organization) => {
    //         if (affiliation.organization.includes(organization.id)) {
    //           this.recipientOrganizations.push(organization);
    //         }
    //       });
    //     });

    //     this.length = this.recipientOrganizations.length;
    //     this.displayedRows$ = this._organizationservice.getCategoriesPgonation(
    //       this.recipientOrganizations,
    //       this.pageIndex,
    //       this.pageSize
    //     );

    //     // get categories of each organization
    //     this.recipientOrganizations.forEach((org) => {
    //       let org2: any = org;
    //       org2.organizationGroups.forEach((group) => {
    //         this._organizationservice
    //           .AllCategoriesByGroup(group)
    //           .subscribe((res) => {
    //             let categories = res.data;
    //             categories.forEach((category) => {
    //               let catData = {
    //                 key: org.id,
    //                 value: category
    //               };
    //               if (
    //                 !this.organizationCategories.some(
    //                   (obj) =>
    //                     obj['key'] === org.id && obj['value'] === category
    //                 )
    //               ) {
    //                 this.organizationCategories.push(catData);
    //               }
    //             });
    //           });
    //       });
    //     });
    //   });
    // this.subscriptions.push(sb2);

    // get All categories
    // this.categoryservice.getAllCategories().subscribe((res) => {
    //   let Allcategories = res.data['content'];
    //   this.categories = Allcategories;
    // });

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  addFileds = this.formbuilder.group({
    certificate: this.formbuilder.array([
      this.formbuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: ''
      })
    ]),
    recipient: this.formbuilder.array([
      this.formbuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        value: ''
      })
    ])
  });

  OrganizationToubdate: FormGroup = new FormGroup({});
  RECfilds: FormGroup = this.formbuilder.group({});
  CERTfilds: FormGroup = this.formbuilder.group({});

  openEditCategoryFilds({ catToUpdat }: { catToUpdat: any }) {
    this.OrganizationToubdate = this.formbuilder.group({
      id: [catToUpdat.id],

      name: [catToUpdat.name ?? '', [Validators.required]],
      certificateFields: [
        catToUpdat.fields.certificate ?? [],
        [Validators.required]
      ],
      recipientFields: [
        catToUpdat.fields.recipient ?? [],
        [Validators.required]
      ]
    });

    let group = {};

    for (
      let i = 0;
      i < this.OrganizationToubdate.value.certificateFields.length;
      i++
    ) {
      let c = this.OrganizationToubdate.value.certificateFields[i];
      group[`${c.name}`] = [c.value];
    }

    this.CERTfilds = this.formbuilder.group(group);

    let group1 = {};

    for (
      let j = 0;
      j < this.OrganizationToubdate.value.recipientFields.length;
      j++
    ) {
      let c = this.OrganizationToubdate.value.recipientFields[j];
      group1[`${c.name}`] = [c.value];
    }

    this.RECfilds = this.formbuilder.group(group1);

    this.dialog.open(this.content, {
      disableClose: true,
      width: '50%'
    });
  }

  UpdateFields() {
    let itemIndex = this.listCategories.findIndex(
      (item) => item.id === this.OrganizationToubdate.value.id
    );
    this.listCategories[itemIndex].fields.certificate.forEach((element1) => {
      element1.value = this.CERTfilds.value[element1.name];
    });

    this.listCategories[itemIndex].fields['recipient'].forEach((element) => {
      element.value = this.RECfilds.value[element.name];
    });

    this.close();
  }
  close(): void {
    this.dialog.closeAll();
  }
}
