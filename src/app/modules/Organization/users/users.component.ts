import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AuthenticationService } from './../../auth/authentication.service';
import { OrganizationService } from './../organization.service';
import { AccountState, IAffiliation, User } from './../../../models/User';
import { SignerModel } from './../../signer/Signer.model';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { RecipientModel } from '../../recipient/Recipient.model';
import { UsersService } from './users.service';
import { IssuerModel } from '../../issuer/Issuer.model';
import { Field } from 'src/app/models/Field';
import { GroupModel } from 'src/app/models/Organization';
import {
  ICategoryFields,
  CategoryModel
} from '../../issuer/category/Category.model';
import { map } from 'rxjs/operators';
import { ValidateUsername } from '../../recipient-organization/recipients/validate-username';
import { EmailValidator } from '../../issuer/sub-issuer/email-validation';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidationPhoneEmail } from '../../issuer/recipients/validation-phone-email';
import { IssuerOrganization } from '../models/IssuerOrganization';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent
  extends SmartComponent
  implements OnInit, OnDestroy
{
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('templateInviteUsers') templateInviteUsers: any;
  @ViewChild('templateAffectUser') templateAffectUser: any;

  displayedRows$!: Observable<User[]>;
  users: User[] = [];
  Allusers: any[] = [];
  nbrElementinPage = 5;
  pageIndex: number = 0;
  pageSize: number = 5;
  public newUser!: boolean;
  length!: number;
  Titel!: string;
  UserId: string = '';
  UserEmail: string = '';
  UserPhone: string = '';
  subsriptions: Subscription[] = [];
  Categories: any[] = [];
  Affiliations: IAffiliation[] = [];
  GroupeswhithoutIssuer!: any[];
  GroupeswhithtIssuer!: any[];
  affectGroups: any[] = [];
  Id: number = 0;
  userToupdate = null;
  userToaffect;
  img = '/src/assets/media/img/emptyListImg.jpg';
  recipientService: any;
  unsubscribe: any;
  connectedOrgId: string = '';
  EmptyListClickEvent({}: { Event: FormGroup }) {
    this.OpencreatUser();
  }
  constructor(
    private readonly _usersService: UsersService,
    private utilsService: UtilsService,
    private organizationService: OrganizationService,
    public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private authservice: AuthenticationService,
    private notification: SnackbarService,
    public confirmDialogservice: ConfirmDialogService,
    private router: Router,
    private translate: TranslateService
  ) {
    super();
  }

  cerytificatFildes: Field[] = [];
  recipientFildes: Field[] = [];
  categoryFields: ICategoryFields = {
    recipient: this.recipientFildes,
    certificate: this.cerytificatFildes
  };

  categories: CategoryModel[] = [];

  accountState: AccountState[] = [];
  adress: any = null;
  AccountSetting: any = null;
  myCategories!: CategoryModel[];
  groupss!: GroupModel[];
  GroupesOfOrganization!: GroupModel[];

  FilterOptions: string[] = ['ALL', 'ISSUER', 'SIGNER', 'RECIPIENT'];
  searchControl: FormControl = new FormControl('');
  curentOrg!: IssuerOrganization;
  org: any;
  initData() {
    this.curentOrg =
      this.authservice.currentOrganizationSubject.value || this.org;

    this.authservice.currentUserSubject.asObservable().subscribe((data) => {
      let user: any = data;
      this.connectedOrgId = user.organization;
    });

    // invite users Data
    // get the users that don't belong to the issuerOrganization
    const getNewUsers = this.organizationService
      .getUsersNotInOrganization()
      .subscribe((res) => {
        let users = res.data['content'];
        this.Allusers = users.filter((user) => user.role !== 'VERIFIER');
      });
    this.subsriptions.push(getNewUsers);

    // get the users that belong to the issuerOrganization
    const getUsersSub = this.organizationService
      .getAllUsers()
      .subscribe((res) => {
        this.users = res.data;
        this.length = this.users.length;
        this.displayedRows$ = this._usersService.getUsersPagination(
          this.users,
          this.pageIndex,
          this.pageSize
        );
      });
    this.subsriptions.push(getUsersSub);

    const getGroupsSub = this.organizationService
      .getAllGroups()
      .subscribe((res) => {
        this.GroupesOfOrganization = res.data;
        this.GroupeswhithtIssuer = this.GroupesOfOrganization.slice();
        this.GroupeswhithoutIssuer = this.GroupeswhithtIssuer.filter(
          (it) => !it.issuer || it.issuer === '' || it.issuer === null
        );
      });
    this.subsriptions.push(getGroupsSub);
  }

  ngOnInit(): void {
    this.initData();
  }

  close(): void {
    this.initData();
    this.dialog.closeAll();
  }

  UserForm: FormGroup = new FormGroup({});
  affectToGroupFrom: FormGroup = new FormGroup({});

  OpenCategory = (data?: any): void => {
    if (data) {
      this.userToupdate = data;
    }
    let GroupsNames: any = [];
    let catIds: string[] = [];
    let groupIds: string[] = [];
    let groupId: string;
    let groupValue: any;
    let categories = data?.categories || [];
    if (data) {
      if (data.role === 'ISSUER') {
        if (data.groups.length > 0) {
          let affiliations = data.groups.filter(
            (gr) => gr.organization['id'] === this.curentOrg.id
          );
          affiliations.forEach((affiliation) => {
            this.accountState.push(affiliation.accountState);
            if (affiliation.group) {
              let group = affiliation.group;
              let userGroup = this.GroupesOfOrganization.filter(
                (gr) => gr.id === group.id
              )[0];
              this.GroupeswhithoutIssuer.push(userGroup);
              groupId = group.id;
              groupValue = groupId;
            }
          });
        }
      } else {
        let affiliations: IAffiliation[] = data.groups;
        if (affiliations.length > 0) {
          affiliations.forEach((a) => {
            if (a.group) {
              let g = a.group;
              groupIds.push(g.id + '');
            }
          });
        }
        groupValue = groupIds;
      }
    }
    categories.forEach((cat) => {
      catIds.push(cat.id);
    });

    this.UserForm = this.formbuilder.group(
      {
        id: [data?.id ?? ''],
        firstname: [
          data?.firstname ?? '',
          {
            validators: Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ])
          }
        ],

        lastname: [
          data?.lastname ?? '',
          {
            validators: Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ])
          }
        ],

        username: [
          data?.username ?? '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              ValidateUsername()
            ],
            asyncValidators: [this.existingUserNameValidator(data?.username)],
            updateOn: 'blur'
          }
        ],

        birthday: [data?.birthday ?? ''],

        email: [
          data?.email ?? '',
          {
            validators: [EmailValidator(this.utilsService)],
            asyncValidators: [this.existingEmailValidator(data?.email)],
            updateOn: 'blur'
          }
        ],

        phone: this.formbuilder.group({
          name: '',
          iso2: '',
          placeHolder: [
            data?.phone.placeHolder ?? '',
            {
              asyncValidators: [
                this.existingPhoneValidator(data?.phone.placeHolder)
              ]
            }
          ],
          flagClass: '',
          dialCode: '',
          priority: ''
        }),

        role: [data?.role ?? '', [Validators.required]],

        occupation: [data?.occupation ?? ''],

        GroupesOfOrganization: [groupValue],

        GroupeswhithoutIssuer: [GroupsNames ?? ''],

        categories: [catIds ?? '']
      },
      {
        validators: [ValidationPhoneEmail]
      }
    );
  };

  OpencreatUser() {
    this.newUser = true;
    this.OpenCategory();
    this.dialog.open(this.content, {
      disableClose: true,
      width: '70%',
      height: '64%'
    });
  }

  OpenUpdateUser({ userToUpdate }: { userToUpdate: any }) {
    this.UserId = userToUpdate.id;
    this.UserEmail = userToUpdate.email;
    this.UserPhone = userToUpdate.phone.placeHolder;
    this.Categories = [];
    this.newUser = false;
    this.Titel = 'Update user';
    this.OpenCategory(userToUpdate);
    this.dialog.open(this.content, {
      disableClose: true,
      width: '70%',
      height: '64%'
    });
  }

  DEleteUser({ catToUpdat }: { catToUpdat: any }) {
    const options = {
      title: this.translate.instant('ORGANIZATION.USERS.DELETEMODAL.TITLE'),
      message: this.translate.instant('ORGANIZATION.USERS.DELETEMODAL.MESSAGE'),
      cancelText: this.translate.instant(
        'ORGANIZATION.USERS.DELETEMODAL.CANCEL'
      ),
      confirmText: this.translate.instant(
        'ORGANIZATION.USERS.DELETEMODAL.CONFIRM'
      ),
      waitDesciption: this.translate.instant(
        'ORGANIZATION.USERS.DELETEMODAL.WAIT'
      )
    };

    this.confirmDialogservice.open(options);
    this.confirmDialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        let userId = catToUpdat.id;
        let groupId = catToUpdat.groups[0].group.id;
        if (catToUpdat.role === 'SIGNER') {
          const deleteSignerSub = this.organizationService
            .DeleteSigner(userId)
            .subscribe(
              (res: any) => {
                if (res.success) {
                  this.notification.push({
                    message: this.translate.instant(
                      'ORGANIZATION.SUCCESSMESSAGES.DELETESIGNER'
                    ),
                    type: 'success'
                  });
                  this.initData();
                } else {
                  this.notification.push({
                    message: res.message,
                    type: 'warning'
                  });
                }
              },
              (err) => {
                this.notification.push({
                  message: err.message,
                  type: 'error'
                });
              }
            );
          this.subsriptions.push(deleteSignerSub);
        }
        if (catToUpdat.role === 'ISSUER') {
          const deleteIssuerSub = this.organizationService
            .DeleteIssuer(userId)
            .subscribe(
              (res: any) => {
                if (res.success) {
                  this.notification.push({
                    message: this.translate.instant(
                      'ORGANIZATION.SUCCESSMESSAGES.DELETEISSUER'
                    ),
                    type: 'success'
                  });
                  this.initData();
                } else {
                  this.notification.push({
                    message: res.message,
                    type: 'warning'
                  });
                }
              },
              (err) => {
                this.notification.push({
                  message: err.message,
                  type: 'error'
                });
              }
            );
          this.subsriptions.push(deleteIssuerSub);
        }

        if (catToUpdat.role === 'RECIPIENT') {
          const deleteRecipientSub = this.organizationService
            .DeleteRecipient(userId)
            .subscribe(
              (res: any) => {
                if (res.success) {
                  this.notification.push({
                    message: this.translate.instant(
                      'ORGANIZATION.SUCCESSMESSAGES.DELETERECIPIENT'
                    ),
                    type: 'success'
                  });
                  this.initData();
                } else {
                  this.notification.push({
                    message: res.message,
                    type: 'warning'
                  });
                }
              },
              (err) => {
                this.notification.push({
                  message: err.message,
                  type: 'error'
                });
              }
            );
          this.subsriptions.push(deleteRecipientSub);
        }
      }
    });
  }

  paginationCategory({ pageEvent }: { pageEvent: any }) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.displayedRows$ = this._usersService.paginationEvent(
      this.users,
      pageEvent
    );
  }

  AddNewUser({ cat }: { cat: FormGroup }) {
    if (cat.value.role === 'SIGNER') {
      let user: SignerModel = {
        firstname: cat.value.firstname.trim().toLowerCase(),
        lastname: cat.value.lastname.trim().toLowerCase(),
        username: cat.value.username.trim().toLowerCase(),
        email: cat.value.email?.trim().toLowerCase(),
        birthday: new Date(
          cat.value.birthday.year,
          cat.value.birthday.month - 1,
          cat.value.birthday.day
        ),
        phone: cat.value.phone,
        role: cat.value.role,
        address: this.adress,
        accountSettings: this.AccountSetting,
        occupation: cat.value.occupation?.trim().toLowerCase(),
        groups: [],
        signature: ' signer signature'
      };

      let groups: string[] = cat.value.GroupesOfOrganization;
      const createSignersub = this.organizationService
        .AddSigner(groups, user)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.push({
                message: this.translate.instant(
                  'ORGANIZATION.SUCCESSMESSAGES.ADDSIGNER'
                ),
                type: 'success'
              });
              this.initData();
            } else {
              this.notification.push({
                message: res.message,
                type: 'warning'
              });
            }
          },
          (err) => {
            this.notification.push({
              message: err.message,
              type: 'error'
            });
          }
        );
      this.subsriptions.push(createSignersub);
    }
    if (cat.value.role === 'ISSUER') {
      let user: IssuerModel = {
        firstname: cat.value.firstname.trim().toLowerCase(),
        lastname: cat.value.lastname.trim().toLowerCase(),
        username: cat.value.username.trim().toLowerCase(),
        email: cat.value.email?.trim().toLowerCase(),
        birthday: new Date(
          cat.value.birthday.year,
          cat.value.birthday.month - 1,
          cat.value.birthday.day
        ),
        role: cat.value.role,
        phone: cat.value.phone,
        address: this.adress,
        accountSettings: this.AccountSetting,
        groups: [],
        occupation: cat.value.occupation?.trim().toLowerCase
      };
      let groupId = cat.value.GroupesOfOrganization;
      const createIssuerSub = this.organizationService
        .AddIssuer(groupId, user)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.push({
                message: this.translate.instant(
                  'ORGANIZATION.SUCCESSMESSAGES.ADDISSUER'
                ),
                type: 'success'
              });
              this.initData();
            } else {
              this.notification.push({
                message: res.message,
                type: 'warning'
              });
            }
          },
          (err) => {
            this.notification.push({
              message: err.message,
              type: 'error'
            });
          }
        );
      this.subsriptions.push(createIssuerSub);
    }

    if (cat.value.role === 'RECIPIENT') {
      let user: RecipientModel = {
        firstname: cat.value.firstname.trim().toLowerCase(),
        lastname: cat.value.lastname.trim().toLowerCase(),
        username: cat.value.username.trim().toLowerCase(),
        email: cat.value.email?.trim().toLowerCase(),
        birthday: new Date(
          cat.value.birthday.year,
          cat.value.birthday.month - 1,
          cat.value.birthday.day
        ),
        role: cat.value.role,
        phone: cat.value.phone,
        address: this.adress,
        accountSettings: this.AccountSetting,
        groups: [],
        occupation: cat.value.occupation?.trim().toLowerCase(),
        categories: cat.value.categories,
        recipientOrganizations: []
      };

      let groups: string[] = cat.value.GroupesOfOrganization;

      const createUsersub = this.organizationService
        .AddRecipient(groups, user)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.push({
                message: this.translate.instant(
                  'ORGANIZATION.SUCCESSMESSAGES.ADDRECIPIENT'
                ),
                type: 'success'
              });
              this.initData();
            } else {
              this.notification.push({
                message: res.message,
                type: 'warning'
              });
            }
          },
          (err) => {
            this.notification.push({
              message: err.message,
              type: 'error'
            });
          }
        );
      this.subsriptions.push(createUsersub);
    }
    this.Categories = [];
    setTimeout(() => {
      this.close();
    }, 1000);
  }

  UpdateUser({ cat }: { cat: FormGroup }) {
    if (cat.value.role !== 'ISSUER') {
      this.Affiliations = [];
      let groupIds: string[] = cat.value.GroupesOfOrganization;
      groupIds.forEach((g) => {
        let group = this.GroupesOfOrganization.filter((gr) => gr.id === g)[0];
        let af = {
          organization: {
            id: this.connectedOrgId + '',
            name: this.curentOrg.name
          },
          group: {
            id: g + '',
            name: group.name
          },
          active: true,
          accountState: this.accountState[0]
        };
        this.Affiliations.push(af);
      });
    }
    let email: any;
    if (cat.value.email !== this.UserEmail) {
      email = cat.value.email?.trim().toLowerCase();
    }
    if (cat.value.role === 'SIGNER') {
      let user: SignerModel = {
        id: cat.value.id,
        firstname: cat.value.firstname.trim().toLowerCase(),
        lastname: cat.value.lastname.trim().toLowerCase(),
        username: cat.value.username.trim().toLowerCase(),
        email: email,
        birthday: new Date(
          cat.value.birthday.year,
          cat.value.birthday.month - 1,
          cat.value.birthday.day
        ),
        phone: cat.value.phone,
        role: cat.value.role,
        address: this.adress,
        accountSettings: this.AccountSetting,
        occupation: cat.value.occupation?.trim().toLowerCase(),
        groups: this.Affiliations
      };

      const updateSignerSub = this.organizationService
        .UpdateSigner(this.UserId, user)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.push({
                message: this.translate.instant(
                  'ORGANIZATION.SUCCESSMESSAGES.UPDATESIGNER'
                ),
                type: 'success'
              });
              this.initData();
            } else {
              this.notification.push({
                message: res.message,
                type: 'warning'
              });
            }
          },
          (err) => {
            this.notification.push({
              message: err.message,
              type: 'error'
            });
          }
        );
      this.subsriptions.push(updateSignerSub);
    }
    if (cat.value.role === 'ISSUER') {
      let group = this.GroupesOfOrganization.filter(
        (gr) => gr.id === cat.value.GroupesOfOrganization
      )[0];
      let af = [
        {
          organization: {
            id: this.connectedOrgId + '',
            name: this.curentOrg.name
          },
          group: {
            id: cat.value.GroupesOfOrganization + '',
            name: group.name
          },
          active: true,
          accountState: this.accountState[0]
        }
      ];
      let user: IssuerModel = {
        id: cat.value.id,
        firstname: cat.value.firstname.trim().toLowerCase(),
        lastname: cat.value.lastname.trim().toLowerCase(),
        username: cat.value.username.trim().toLowerCase(),
        email: email,
        birthday: new Date(
          cat.value.birthday.year,
          cat.value.birthday.month - 1,
          cat.value.birthday.day
        ),
        role: cat.value.role,
        phone: cat.value.phone,
        address: this.adress,
        accountSettings: this.AccountSetting,
        groups: af,
        occupation: cat.value.occupation?.trim().toLowerCase()
      };

      const updateIssuerSub = this.organizationService
        .UpdateIssuer(this.UserId, user)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.push({
                message: this.translate.instant(
                  'ORGANIZATION.SUCCESSMESSAGES.UPDATEISSUER'
                ),
                type: 'success'
              });
              this.initData();
            } else {
              this.notification.push({
                message: res.message,
                type: 'warning'
              });
            }
          },
          (err) => {
            this.notification.push({
              message: err.message,
              type: 'error'
            });
          }
        );
      this.subsriptions.push(updateIssuerSub);
    }
    if (cat.value.role === 'RECIPIENT') {
      let user: RecipientModel = {
        id: cat.value.id,
        firstname: cat.value.firstname.trim().toLowerCase(),
        lastname: cat.value.lastname.trim().toLowerCase(),
        username: cat.value.username.trim().toLowerCase(),
        email: email,
        birthday: new Date(
          cat.value.birthday.year,
          cat.value.birthday.month - 1,
          cat.value.birthday.day
        ),
        role: cat.value.role,
        phone: cat.value.phone,
        address: this.adress,
        accountSettings: this.AccountSetting,
        groups: this.Affiliations,
        categories: cat.value.categories,
        recipientOrganizations: [],
        occupation: cat.value.occupation?.trim().toLowerCase()
      };

      const updateRecipientSub = this.organizationService
        .UpdateRecipient(this.UserId, user)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.notification.push({
                message: this.translate.instant(
                  'ORGANIZATION.SUCCESSMESSAGES.UPDATERECIPIENT'
                ),
                type: 'success'
              });
              this.initData();
            } else {
              this.notification.push({
                message: res.message,
                type: 'warning'
              });
            }
          },
          (err) => {
            this.notification.push({
              message: err.message,
              type: 'error'
            });
          }
        );
      this.subsriptions.push(updateRecipientSub);
    }

    setTimeout(() => {
      this.close();
    }, 1000);
  }

  AffectUser(data) {
    let userId: string = data.userId;
    let groupIds: string[] = data.groups;
    const AffectTOGroupSub = this.organizationService
      .affectUserToGroup(userId, groupIds)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.push({
              message: this.translate.instant(
                'ORGANIZATION.SUCCESSMESSAGES.AFFECT'
              ),
              type: 'success'
            });
            this.initData();
          } else {
            this.notification.push({
              message: res.message,
              type: 'warning'
            });
          }
        },
        (err) => {
          this.notification.push({
            message: err.message,
            type: 'error'
          });
        }
      );
    this.subsriptions.push(AffectTOGroupSub);
  }

  ApplySearch(filter) {
    this.displayedRows$ = this._usersService.Search(
      this.users,
      filter,
      this.pageIndex,
      this.pageSize
    );
    this.length = this._usersService.listLength;
  }

  /**
   * Get needed items from the server, and fill the datasource (SubIssuers)
   *
   * @param filter - param1 optional
   * @returns void
   */
  filterUsers = (filter?: string) => {
    this.displayedRows$ = this._usersService.filter(
      this.users,
      filter,
      this.searchControl.value,
      this.pageIndex,
      this.pageSize
    );
    this.length = this._usersService.listLength;
  };

  changeState(data) {
    let user = data.user;
    let state = data.state;
    let message = '';
    if (state === AccountState.ACTIVATED) {
      message = this.translate.instant(
        'ORGANIZATION.USERS.ChangeStateModal.MESSAGEACTIVATE'
      );
    } else {
      message = this.translate.instant(
        'ORGANIZATION.USERS.ChangeStateModal.MESSAGEDEACTIVATE'
      );
    }
    const options = {
      title: this.translate.instant(
        'ORGANIZATION.USERS.ChangeStateModal.TITLE'
      ),
      message: message,
      cancelText: this.translate.instant(
        'ORGANIZATION.USERS.ChangeStateModal.CANCEL'
      ),
      confirmText: this.translate.instant(
        'ORGANIZATION.USERS.ChangeStateModal.CONFIRM'
      ),
      waitDesciption: this.translate.instant(
        'ORGANIZATION.USERS.ChangeStateModal.WAIT'
      )
    };
    this.confirmDialogservice.open(options);
    this.confirmDialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        const changestateSub = this.organizationService
          .changeAccountState(user.id)
          .subscribe(
            (res: any) => {
              if (res.success) {
                this.notification.push({
                  message: this.translate.instant(
                    'ORGANIZATION.SUCCESSMESSAGES.CHANGESTATE'
                  ),
                  type: 'success'
                });
                this.initData();
              } else {
                this.notification.push({
                  message: res.message,
                  type: 'warning'
                });
              }
            },
            (err) => {
              this.notification.push({
                message: err.message,
                type: 'error'
              });
            }
          );
        this.subsriptions.push(changestateSub);
      }
    });
  }

  SelectCategory({ cat }: { cat: any }) {
    this.categories = [];
    cat.categories.forEach((category) => {
      cat.selectedCategoriesIds.forEach((id) => {
        if (category.id === id) {
          this.categories.push(category);
        }
      });
    });
  }

  OpenDialogToInviteUsers = () => {
    this.dialog.open(this.templateInviteUsers, {
      width: '70em',
      panelClass: ['padding-0', 'custom-overflow']
    });
  };

  openAffectUser = (user) => {
    this.userToaffect = user;
    let catIds: string[] = [];
    let groupIds: string[] = [];
    let groupValue: any;
    let categories = user?.categories || [];
    if (user) {
      if (user.role !== 'ISSUER') {
        this.affectGroups = this.GroupesOfOrganization;
        let affiliations: IAffiliation[] = user.groups;
        if (affiliations) {
          if (affiliations.length > 0) {
            affiliations.forEach((a) => {
              let g = a.group;
              if (g) {
                groupIds.push(g.id + '');
              }
            });
          }
        }
        groupValue = groupIds;
      } else {
        this.affectGroups = this.GroupeswhithoutIssuer;
      }
    }
    categories.forEach((cat) => {
      catIds.push(cat.id);
    });
    this.affectToGroupFrom = new FormGroup({
      groupesCL: new FormControl(groupValue, Validators.required),
      categoriesCL: new FormControl(catIds || [], Validators.required)
    });
    this.dialog.open(this.templateAffectUser, {
      width: '70em',
      panelClass: ['padding-0', 'custom-overflow']
    });
  };

  InviteUsers = (data) => {
    let grouId = data.groupId;
    let invites = {
      userIDs: data.userIDs,
      categories: data.categories
    };
    this.organizationService.InviteUser(grouId, invites).subscribe(
      (res: any) => {
        if (res.success) {
          this.notification.push({
            message: this.translate.instant(
              'ORGANIZATION.SUCCESSMESSAGES.INVITEUSER'
            ),
            type: 'success'
          });
          this.initData();
        } else {
          this.notification.push({
            message: res.message,
            type: 'warning'
          });
        }
      },
      (err) => {
        this.notification.push({
          message: err.message,
          type: 'error'
        });
      }
    );
  };

  impersonateAccount(userId) {
    const ImpresonamteAccountsub = this.organizationService
      .ImpersonateUser(userId)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.push({
              message: this.translate.instant(
                'ORGANIZATION.SUCCESSMESSAGES.IMPERSONATE'
              ),
              type: 'success'
            });
          } else {
            this.notification.push({
              message: res.message,
              type: 'warning'
            });
          }
          this.organizationService.ImpersonateToken.next(res.data);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (err) => {
          this.notification.push({
            message: err.message,
            type: 'error'
          });
        }
      );
    this.subsriptions.push(ImpresonamteAccountsub);
  }

  ngOnDestroy() {
    this.subsriptions.forEach((sb) => sb.unsubscribe());
  }

  showSpinnerUsername: boolean = false;
  existingUserNameValidator(username: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        (username === undefined || username !== control.value)
      ) {
        this.showSpinnerUsername = true;
        return this.authservice.ValidateUsername(control.value).pipe(
          map((resp) => {
            this.showSpinnerUsername = false;
            return resp.data
              ? { alreadyTaken: 'Username already taken' }
              : null;
          })
        );
      }

      return of(null);
    };
  }

  showSpinnerEmail: boolean = false;
  existingEmailValidator(email: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        (email === undefined || email !== control.value)
      ) {
        this.showSpinnerEmail = true;
        return this.authservice.ValidateEmail(control.value).pipe(
          map((resp) => {
            this.showSpinnerEmail = false;
            return resp.data ? { alreadyTaken: 'Email already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }

  showSpinnerPhone: boolean = false;
  existingPhoneValidator(phone: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        control.value !== null &&
        (phone === undefined || phone !== control.value)
      ) {
        this.showSpinnerPhone = true;
        let _phone = {
          dialCode: this.UserForm.get('phone.dialCode')?.value,
          flagClass: this.UserForm.get('phone.flagClass')?.value,
          iso2: this.UserForm.get('phone.iso2')?.value,
          name: this.UserForm.get('phone.name')?.value,
          placeHolder: control.value,
          priority: this.UserForm.get('phone.priority')?.value
        };

        return this.authservice.ValidatePhone(_phone).pipe(
          map((resp) => {
            this.showSpinnerPhone = false;
            return resp.data ? { alreadyTaken: 'Phone already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }
}
