import { TranslateService } from '@ngx-translate/core';
import { AuthHTTPService } from 'src/app/modules/auth/services/auth-http.service';
import { IssuerOrganization } from 'src/app/modules/Organization/models/IssuerOrganization';
import { AuthenticationService } from './../../auth/authentication.service';
import { OrganizationService } from './../organization.service';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';
import { SignerModel } from 'src/app/modules/signer/Signer.model';
import { IssuerModel } from 'src/app/modules/issuer/Issuer.model';
import { GroupsService } from './groups.service';
import { Observable, Subscription, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GroupModel } from 'src/app/models/Organization';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent
  extends SmartComponent
  implements OnInit, OnDestroy
{
  @ViewChild('create') createModal: any;
  @ViewChild('edit') editModal: any;
  @ViewChild('sendCredit') sendCreditModal: any;

  subscriptions: Subscription[] = [];

  updateGroup!: GroupModel;
  creditGroup!: GroupModel;
  fm!: FormGroup;
  creditForm!: FormGroup;
  groups: any[] = [];
  issuers$!: Observable<IssuerModel[]>;
  issuers: IssuerModel[] = [];
  signers$!: Observable<SignerModel[]>;
  recipients$!: Observable<RecipientModel[]>;

  length!: number;
  nbrElementinPage = 5;
  pageIndex: number = 0;
  pageSize: number = 5;
  Groups$!: Observable<GroupModel[]>;

  FilterOptions: string[] = [
    'all',
    'groups with issuer',
    'groups without issuer'
  ];

  searchControl: FormControl = new FormControl('');
  currentUser;
  constructor(
    private groupService: GroupsService,
    private organizationService: OrganizationService,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private httpAuthService: AuthHTTPService,
    private notification: SnackbarService,
    public confirmDialogservice: ConfirmDialogService,
    private translateService: TranslateService
  ) {
    super();
  }
  curentOrg!: IssuerOrganization;
  org: any = null;
  orgCredit: number = 0;
  init() {
    this.httpAuthService.getCurrentOrganization().subscribe((res: any) => {
      this.curentOrg = res.data;
      if (this.curentOrg.pack !== null) {
        let pack = this.curentOrg.pack;
        if (pack) {
          this.orgCredit = pack.storage;
        }
      }
    });

    this.authService.currentUserSubject.asObservable().subscribe((data) => {
      this.currentUser = data;
    });

    const getUsersSubscription = this.organizationService
      .getAllUsers()
      .subscribe((res) => {
        let users = res.data;
        let issuers: any[] = [];
        let signers: any[] = [];
        let recipients: any[] = [];
        // filter users by role
        users.forEach((user) => {
          if (user.role === 'SIGNER') {
            signers.push(user);
          } else if (user.role === 'RECIPIENT') {
            recipients.push(user);
          }
        });
        this.signers$ = of(signers);
        this.recipients$ = of(recipients);
      });
    this.subscriptions.push(getUsersSubscription);

    const getNonAffectedIssuersSub = this.organizationService
      .getAllNonAffectedIssuers()
      .subscribe((res) => {
        this.issuers$ = of(res.data['content']);
      });

    this.subscriptions.push(getNonAffectedIssuersSub);

    const getGroupsSub = this.organizationService
      .getAllGroups()
      .subscribe((res) => {
        this.groups = res.data;
        this.length = res.data.length;
        this.groups.forEach((group) => {
          this.issuers.forEach((issuer) => {
            if (group.issuer === issuer.id) {
              group.issuer = issuer;
            }
          });
        });
        this.Groups$ = this.groupService.getGroupPagination(
          this.groups,
          this.pageIndex,
          this.pageSize
        );
      });
    this.subscriptions.push(getGroupsSub);
  }

  ngOnInit(): void {
    this.init();
  }

  ApplySearch(filter) {
    this.Groups$ = this.groupService.Search(
      this.groups,
      filter,
      this.pageIndex,
      this.pageSize
    );
    this.length = this.groupService.listLength;
  }

  filterGroups(filter) {
    this.Groups$ = this.groupService.Filter(
      this.groups,
      filter,
      this.searchControl.value,
      this.pageIndex,
      this.pageSize
    );
    this.length = this.groupService.listLength;
  }

  Sort({ sort }: { sort: any }) {
    this.Groups$ = this.groupService.Sort(
      this.groups,
      sort,
      this.pageIndex,
      this.pageSize
    );
  }

  paginationCategory({ pageEvent }: { pageEvent: any }) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.Groups$ = this.groupService.paginationEvent(this.groups, pageEvent);
  }

  initFormGroup = (group?: GroupModel): void => {
    let isNameDisabled: boolean = false;
    let issuer = '';
    if (group) {
      if (group.issuer !== null) {
        let type = typeof group?.issuer;
        if (type === 'object') {
          let grpIssuer: any = group.issuer;
          issuer = grpIssuer.id;
        } else if (type === 'string') {
          issuer = group.issuer;
        }
      }
      let signers = group.signers || [];
      let recipients = group.recipients || [];
      if (group.issuer !== '' || signers.length > 0 || recipients.length > 0) {
        isNameDisabled = true;
      } else {
        isNameDisabled = false;
      }
    }

    this.fm = new FormGroup({
      descriptionControl: new FormControl(group?.description ?? ''),
      name: new FormControl(
        { value: group?.name ?? '', disabled: isNameDisabled },
        Validators.required
      ),
      groupNameControl: new FormControl('', Validators.required),
      issuerControl: new FormControl(issuer),
      signersControl: new FormControl(group?.signers ?? ''),
      recipientsControl: new FormControl(group?.recipients ?? ''),
      organizationControl: new FormControl(''),
      groupControl: new FormControl(''),
      categoryControl: new FormControl('')
    });
  };

  intcreditform(group) {
    this.creditForm = new FormGroup({
      credit: new FormControl(group.credits, Validators.required)
    });
  }

  OpenDialogAdd = () => {
    this.initFormGroup();
    this.dialog.open(this.createModal, {
      panelClass: ['padding-0']
    });
  };

  deleteGroup(groupId: string) {
    const options = {
      title: this.translateService.instant(
        'ORGANIZATION.GROUPS.DELETEMODAL.TITLE'
      ),
      message: this.translateService.instant(
        'ORGANIZATION.GROUPS.DELETEMODAL.MESSAGE'
      ),
      cancelText: this.translateService.instant(
        'ORGANIZATION.GROUPS.DELETEMODAL.CANCEL'
      ),
      confirmText: this.translateService.instant(
        'ORGANIZATION.GROUPS.DELETEMODAL.CONFIRM'
      ),
      waitDesciption: this.translateService.instant(
        'ORGANIZATION.GROUPS.DELETEMODAL.WAIT'
      )
    };

    this.confirmDialogservice.open(options);
    this.confirmDialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        const deleteSubscription = this.organizationService
          .deleteOrganizationGroup(groupId)
          .subscribe(
            (res: any) => {
              if (res.success) {
                this.notification.push({
                  message: this.translateService.instant(
                    'ORGANIZATION.SUCCESSMESSAGES.DELETEGROUP'
                  ),
                  type: 'success'
                });
                this.init();
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
        this.subscriptions.push(deleteSubscription);
      }
    });
  }

  OpenEditModal(group: GroupModel) {
    this.updateGroup = group;
    this.initFormGroup(group);
    this.dialog.open(this.editModal, {
      panelClass: ['padding-0']
    });
  }

  EditGroup(data) {
    const updateGroupsub = this.organizationService
      .updateOrganizationGroup(data.groupId, data.newGroup)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.push({
              message: this.translateService.instant(
                'ORGANIZATION.SUCCESSMESSAGES.UPDAREGROUP'
              ),
              type: 'success'
            });
            this.init();
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
    this.Dismiss(true);

    this.subscriptions.push(updateGroupsub);
  }

  AddGroup(group) {
    group.organization = this.currentUser.organization;
    const createSubscription = this.organizationService
      .createGroup(group)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.notification.push({
              message: this.translateService.instant(
                'ORGANIZATION.SUCCESSMESSAGES.ADDGROUP'
              ),
              type: 'success'
            });
            this.init();
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
    this.Dismiss(true);

    this.subscriptions.push(createSubscription);
  }

  openSendCreditModal(group) {
    this.intcreditform(group);
    this.creditGroup = group;
    this.dialog.open(this.sendCreditModal, {
      width: '400px',
      panelClass: ['padding-0']
    });
  }

  sendCreditToGroup(data) {
    let group = data.group;
    let creditValue = parseInt(data.creditValue);
    this.organizationService.sendCreditToGroup(group.id, creditValue).subscribe(
      (res: any) => {
        if (res.success) {
          this.notification.push({
            message: this.translateService.instant(
              'ORGANIZATION.SUCCESSMESSAGES.CREDITSUCCESS'
            ),
            type: 'success'
          });
          this.init();
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
    this.Dismiss(true);
  }

  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
