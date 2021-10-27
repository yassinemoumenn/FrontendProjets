import { IssuerOrganization } from './../../Organization/models/IssuerOrganization';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Observable, of } from 'rxjs';
import { Ipaginator } from 'src/app/models/helpers/Page';
import { CategoryService } from './category.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import {
  CategoryModel,
  customIDField,
  ICategoryFields,
  IdGenerationType
} from './Category.model';
import { Field } from 'src/app/models/Field';
import {
  IAccountSettings,
  IAddress,
  IAffiliation,
  INotification,
  Role,
  User
} from 'src/app/models/User';
import { VerifierModel } from '../../verifier/Verifier.model';
import { GroupModel, Organization } from 'src/app/models/Organization';
import { AuthenticationService } from '../../auth/authentication.service';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
export interface OptionItem {
  id: any;

  firstname: any;
  lastname: any;
  picture: any;
  show: boolean;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends SmartComponent implements OnInit {
  @ViewChild('content') content!: TemplateRef<any>;
  public newCertif!: boolean;
  public EditCateg!: FormGroup;
  public Id: number = 0;
  Titel!: string;
  Type!: string;
  curentUser;
  messageDElete = {
    TITELE: '',
    cancelText: '',
    confirmText: ''
  };
  constructor(
    public dialog: MatDialog,
    private readonly _categoryService: CategoryService,
    public dialogservice: ConfirmDialogService,
    private formbuilder: FormBuilder,
    private userService: AuthenticationService,
    translate: TranslateService
  ) {
    super();
    translate.get('ISSUER.CATEGORY').subscribe((text: string) => {
      this.messageDElete.TITELE = text['DELET_MESSAG'];
      this.messageDElete.cancelText = text['CANCEL'];
      this.messageDElete.confirmText = text['CONFIRM_DELET'];
    });
  }
  img = '/src/assets/media/img/emptyListImg.jpg';
  title = 'Welcome!';
  Desc =
    'There are no categories added yet! ' +
    '\n' +
    ' Kickstart your business by adding your first category.';

  labelButton = 'Add Category';
  EmptyList!: boolean;
  length!: number;
  Pageable: Ipaginator = {
    paginator: {
      offset: 100,
      pageNumber: 0,
      pageSize: 3,
      paged: true,
      sort: {
        empty: true,
        sorted: false,
        unsorted: false
      }
    },
    numberOfElements: this.length
  };
  nbrElementinPage = 5;
  pageIndex: number = 0;
  pageSize: number = 5;
  rows$!: Observable<CategoryModel[]>;
  isLoading: boolean = false;
  displayedRows$!: Observable<any[]>;

  certificateFields: Field[] = [];
  recipientFields: Field[] = [];
  idSigners: any[] = [];
  recipientFieldsNames: string[] = [];
  certificateFieldsNames: string[] = [];

  affiliation: IAffiliation[] = [
    {
      group: { id: 'string', name: 'string' },
      organization: { id: 'string', name: 'string' }
    }
  ];
  AccountNotification: INotification = {
    sms: true,
    email: true,
    app: false
  };
  AccountSetting: IAccountSettings = {
    notification: this.AccountNotification,
    twoFactorAuthentication: true,
    passwordResetVerification: true
  };
  adress: IAddress = {
    country: 'Morroco',
    city: 'oujda',
    postalCode: 16200
  };

  Verifiers: VerifierModel[] = [];

  listSigners: User[] = [];

  optionItems!: Array<OptionItem>;
  SignersOptionItems!: Array<OptionItem>;

  organization!: Organization;
  CurrentGroup!: any;
  CurrentOrganization!: any;
  ngOnInit(): void {
    let sb = this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.curentUser = Object.assign({}, user);
      });

    this.curentUser.groups.forEach((element) => {
      if (element.currentOrganization === true) {
        this.CurrentGroup = element.group;

        this.CurrentOrganization = element.organization;
      }
    });

    this._categoryService
      .getCurrentOrganization(this.CurrentOrganization.id)
      .subscribe((result) => {
        this.organization = result.data;
      });
    this._categoryService
      .getAllSigners(this.CurrentGroup.id)
      .subscribe((result) => {
        this.listSigners = result.data['content'];

        this.SignersOptionItems = this.listSigners.map((item) => {
          return {
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            picture: item.picture === null ? '' : item.picture,
            show: false
          };
        });
      });

    this._categoryService
      .getAllVerifiers(this.CurrentGroup.id)
      .subscribe((result) => {
        this.Verifiers = result.data['content'];

        this.optionItems = this.Verifiers.map((item) => {
          return {
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            picture: item.picture === null ? '' : item.picture,
            show: false
          };
        });
      });

    this._categoryService
      .getAllFields(this.CurrentGroup.id)
      .subscribe((result) => {
        this.certificateFields = result.data.certificate;
        this.recipientFields = result.data.recipient;

        this.certificateFields.forEach((element) => {
          this.certificateFieldsNames.push(element.name);
        });

        this.recipientFields.forEach((element) => {
          this.recipientFieldsNames.push(element.name);
        });
      });

    this.listSigners.forEach((element) => {
      this.idSigners.push(element.id);
    });

    this._categoryService
      .getAllCategories(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.displayedRows$ = result.data['content'];
        this.length = result.data['totalElements'];
      });
  }
  control = new FormControl();
  NoData: boolean = false;
  ApplySearch(filter) {
    if (this.control.value !== '') {
      this._categoryService.getAllCategories().subscribe((result) => {
        this.displayedRows$ = result.data['content'].filter(
          (it) =>
            it.name.toLowerCase().includes(this.control.value.toLowerCase()) ||
            it.id?.toLowerCase().includes(this.control.value.toLowerCase())
        );
        let ccc = result.data['content'].filter(
          (it) =>
            it.name.toLowerCase().includes(this.control.value.toLowerCase()) ||
            it.id?.toLowerCase().includes(this.control.value.toLowerCase())
        );

        if (ccc.length === 0) {
          this.NoData = true;
        }
      });
    } else {
      this._categoryService
        .getAllCategories(this.pageIndex, this.pageSize)
        .subscribe((result) => {
          this.displayedRows$ = result.data['content'];
        });
      this.NoData = false;
    }
  }

  confirmdialogv1(elem) {
    const options = {
      title: this.messageDElete.TITELE,
      message: '',
      cancelText: this.messageDElete.cancelText,
      confirmText: this.messageDElete.confirmText,
      waitDesciption: 'processing . . .'
    };

    this.dialogservice.open(options);
    this.dialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this._categoryService.deleteCategory(elem.id).subscribe(() => {});

        this._categoryService.getAllCategories().subscribe((result) => {
          this.length = result.data['totalElements'];
        });

        this._categoryService
          .getAllCategories(this.pageIndex, this.pageSize)
          .subscribe((result) => {
            this.displayedRows$ = result.data['content'];
          });
      }
    });
  }

  DEletCat({ catToUpdat }: { catToUpdat: any }) {
    this.confirmdialogv1(catToUpdat);
  }

  openNewCategory({}) {
    this.newCertif = true;
    this.OpenCategory();
    this.dialog.open(this.content, {
      disableClose: true,
      width: '50%'
    });
  }

  OpenCategoryToUpdate({ catToUpdat }: { catToUpdat: any }) {
    this.EditCateg = catToUpdat;
    this.newCertif = false;
    this.Titel = 'Update Category';
    this.OpenCategory(catToUpdat);
    this.dialog.open(this.content, {
      disableClose: true,
      width: '50%'
    });
  }

  categoryForm: FormGroup = new FormGroup({});
  /**
   * Initialize the form group to add and edit sub issuer
   *
   * @param data - Oprional : case edit we pass the sub issuer to be edited
   * @returns void
   */

  OpenCategory = (data?: FormGroup): void => {
    this.categoryForm = this.formbuilder.group({
      id: [data?.value.id],
      idGenerationType: [
        data?.value.idGenerationType ?? '',
        [Validators.required]
      ],
      name: [data?.value.name ?? '', [Validators.required]],
      certificateFields: [data?.value.fields ?? [], [Validators.required]],
      recipientFields: [
        data?.value.recipientFields ?? [],
        [Validators.required]
      ],
      recipientblockchainFields: [data?.value.recipientblockchainFields ?? []],
      certificateblockchainFields: [
        data?.value.certificateblockchainFields ?? []
      ],
      signers: [data?.value.signers ?? []],
      verifiers: [data?.value.verifiers ?? []],
      customID: [data?.value.customID ?? []]
    });
  };

  UpDateCat({ catToUpdat }: { catToUpdat: FormGroup }) {
    let Type: IdGenerationType = catToUpdat.value.idGenerationType;

    const cerytificatFildes: Field[] = [];
    const recipientFildes: Field[] = [];

    catToUpdat.value.certificateFields.forEach((element) => {
      cerytificatFildes.push(new Field(element));
    });

    catToUpdat.value.recipientFields.forEach((element) => {
      recipientFildes.push(new Field(element));
    });

    const categoryFields: ICategoryFields = {
      recipient: recipientFildes,
      certificate: cerytificatFildes
    };

    let G: GroupModel = {
      id: this.CurrentGroup.id,
      organization: '',
      name: this.CurrentGroup.name,
      issuer: '',
      recipients: ['', ''],
      credits: 6
    };

    let ID: customIDField[] = [];
    if (Type === 'CUSTOM') {
      catToUpdat.value.customID.value.Nchamp.forEach((element) => {
        let f: Field = {
          name: element.value.name.trim().toLowerCase(),
          type: element.value.type.trim().toLowerCase(),
          value: element.value.value.trim().toLowerCase(),
          new: element.value.isNew === undefined ? '' : element.value.isNew,
          inBlockchain:
            element.value.inBlockchain === undefined
              ? ''
              : element.value.inBlockchain.trim().toLowerCase()
        };

        ID.push({
          field: f,
          length: +element.Ncaracter,
          day: element.day,
          month: element.month,
          year: element.year,
          source: element.value.source
        });
      });
    }
    const categoryInfo: CategoryModel[] = [
      {
        id: catToUpdat.value.id,
        name: catToUpdat.value.name.trim().toLowerCase(),
        idGenerationType: Type,
        fields: categoryFields,
        issuer: catToUpdat.value.issuer,
        signers: catToUpdat.value.signers,
        verifiers: catToUpdat.value.verifiers,
        group: G,
        customID: ID
      }
    ];
    this._categoryService.updateCategories(categoryInfo).subscribe(() => {});

    this._categoryService
      .getAllCategories(this.pageIndex, this.pageSize)
      .subscribe((res) => {
        this.displayedRows$ = res.data['content'];
      });
  }
  EmptyListClickEvent({}: { Event: FormGroup }) {
    this.Titel = 'Add Category';
    this.newCertif = true;
    this.dialog.open(this.content, {
      width: '50%'
    });
  }
  addNewCat({ cat }: { cat: FormGroup }) {
    let Type: IdGenerationType = cat.value.idGenerationType;
    const cerytificatFildes: Field[] = [];
    const recipientFildes: Field[] = [];

    cat.value.certificateFields.forEach((element) => {
      element.name=element.name?.trim().toLowerCase();
      element.value = element.value?.trim().toLowerCase();
      cerytificatFildes.push(element);
    });
    cat.value.recipientFields.forEach((element) => {
      element.name = element.name?.trim().toLowerCase();
      element.value = element.value?.trim().toLowerCase();
      recipientFildes.push(element);
    });
    const categoryFields: ICategoryFields = {
      recipient: recipientFildes,
      certificate: cerytificatFildes
    };

    let G: GroupModel = {
      id: this.CurrentGroup.id,
      organization: '',
      name: this.CurrentGroup.name,
      issuer: '',
      recipients: ['', ''],
      credits: 6
    };

    let ID: customIDField[] = [];
    if (Type === 'CUSTOM') {
      cat.value.customID.value.Nchamp.forEach((element) => {
        let f: Field = {
          name: element.value.name.trim().toLowerCase(),
          type: element.value.type,
          value: element.value.value.trim().toLowerCase(),
          new: element.value.isNew === undefined ? '' : element.value.isNew,
          inBlockchain:
            element.value.inBlockchain === undefined
              ? ''
              : element.value.inBlockchain
        };

        ID.push({
          field: f,
          length: +element.Ncaracter,
          day: element.day,
          month: element.month,
          year: element.year,
          source: element.value.source
        });
      });
    }
    const categoryInfo: CategoryModel[] = [
      {
        name: cat.value.name.trim().toLowerCase(),
        idGenerationType: Type,
        fields: categoryFields,
        issuer: cat.value.issuer,
        signers: cat.value.signers,
        verifiers: cat.value.verifiers,
        group: G,
        customID: ID
      }
    ];

    this._categoryService.createCategories(categoryInfo).subscribe(() => {});

    this._categoryService
      .getAllCategories(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.displayedRows$ = result.data['content'];
        this.length = result.data['totalElements'];
      });
  }
  getPage() {
    this._categoryService
      .getAllCategories(this.pageIndex, this.pageSize)
      .subscribe((res) => {
        this.displayedRows$ = of(res.data['content']);
      });
  }
  close(): void {
    this.dialog.closeAll();
  }

  AddRecipientFields({ field }: { field: FormGroup }) {
    const control = field.value.recipient;
    let elem: any;
    for (elem of control) {
      const g = this.recipientFields.find(
        (x) => x.name === elem.name && x.type === elem.type
      );
      if (g === undefined) {
        this.recipientFields.push({
          name: elem.name.trim().toLowerCase(),
          type: elem.type,
          value: '',
          new: true
        });
        this.recipientFieldsNames.push(elem.name.trim().toLowerCase());
      }
    }
  }
  AddCertificatFields({ field }: { field: FormGroup }) {
    const control = field.value.certificate;
    let elem: any;
    for (elem of control) {
      const g = this.certificateFields.find(
        (x) => x.name === elem.name && x.type === elem.type
      );
      if (g === undefined) {
        this.certificateFields.push({
          name: elem.name.trim().toLowerCase(),
          type: elem.type,
          value: '',
          new: true
        });
        this.certificateFieldsNames.push(elem.name.trim().toLowerCase());
      }
    }
  }

  DeleteCertifFiled({ field }: { field: any }) {
    let toDElet = field.value;
    let x: any;
    let i = 0;
    for (x of this.certificateFields) {
      if (
        x.isNew === toDElet.isNew &&
        x.name === toDElet.name &&
        x.type === toDElet.type
      ) {
        this.certificateFields.splice(i, 1);
      }
      i++;
    }
    this.certificateFieldsNames = [];
    this.certificateFields.forEach((element) => {
      this.certificateFieldsNames.push(element.name);
    });
  }
  DeleteRecipientFiled({ field }: { field: any }) {
    let toDElet = field.value;
    let x: any;
    let i = 0;
    for (x of this.recipientFields) {
      if (
        x.isNew === toDElet.isNew &&
        x.name === toDElet.name &&
        x.type === toDElet.type
      ) {
        this.recipientFields.splice(i, 1);
      }
      i++;
    }
    this.recipientFieldsNames = [];
    this.recipientFields.forEach((element) => {
      this.recipientFieldsNames.push(element.name);
    });
  }

  paginationCategory({ pageEvent }: { pageEvent: any }) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;

    this._categoryService
      .getAllCategories(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.displayedRows$ = result.data['content'];
      });
  }
}
