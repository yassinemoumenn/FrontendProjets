import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { ConfirmDialogService } from './../../../shared/confirm-dialog/confirm-dialog.service';
import { SnackbarService } from './../../../shared/components/snackbar/snackbar.service';
import { OrganizationService } from '../organization.service';
import { User } from '../../../models/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';

import { IssuersRequestsService } from './issuer-request.service';
import { GroupModel } from 'src/app/models/Organization';
import { CategoryModel } from '../../issuer/category/Category.model';

@Component({
  selector: 'app-issuer-request',
  templateUrl: './issuer-request.component.html',
  styleUrls: ['./issuer-request.component.scss']
})
export class IssuerRequestsComponent
  extends SmartComponent
  implements OnInit, OnDestroy
{
  displayedRows$!: Observable<User[]>;
  requests: User[] = [];
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

  GroupeswhithoutIssuer!: any[];
  GroupeswhithtIssuer!: any[];
  Id: number = 0;

  constructor(
    private readonly issuerRequestsService: IssuersRequestsService,
    private organizationService: OrganizationService,
    public dialog: MatDialog,
    private notification: SnackbarService,
    private authservice: AuthenticationService,
    public confirmDialogservice: ConfirmDialogService,
    private translate: TranslateService
  ) {
    super();
  }

  categories: CategoryModel[] = [];

  adress: any = null;
  AccountSetting: any = null;
  myCategories!: CategoryModel[];
  groupss!: GroupModel[];
  GroupesOfOrganization!: GroupModel[];
  curentOrg;
  initData() {
    this.curentOrg = this.authservice.currentOrganizationSubject.value;
    const getRequestsSub = this.organizationService
      .getAllIssuerRequests()
      .subscribe((res) => {
        this.requests = res.data;
        this.length = this.requests.length;
        this.displayedRows$ =
          this.issuerRequestsService.getIssuersRequestPagination(
            this.requests,
            this.pageIndex,
            this.pageSize
          );
      });

    this.subsriptions.push(getRequestsSub);

    const getGroupsSub = this.organizationService
      .getAllGroups()
      .subscribe((res) => {
        this.GroupesOfOrganization = res.data;
      });
    this.subsriptions.push(getGroupsSub);
  }

  ngOnInit(): void {
    this.initData();
  }

  close(): void {
    this.dialog.closeAll();
  }

  UserForm: FormGroup = new FormGroup({});

  paginationCategory({ pageEvent }: { pageEvent: any }) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.displayedRows$ = this.issuerRequestsService.paginationEvent(
      this.requests,
      pageEvent
    );
  }

  ApplySearch(filter) {
    this.displayedRows$ = this.issuerRequestsService.Search(
      this.requests,
      filter,
      this.pageIndex,
      this.pageSize
    );
    this.length = this.issuerRequestsService.listLength;
  }

  cancelRequest(user) {
    const options = {
      title: this.translate.instant('ORGANIZATION.REQUESTS.REFUSEMODAL.TITLE'),
      message: this.translate.instant(
        'ORGANIZATION.REQUESTS.REFUSEMODAL.MESSAGE'
      ),
      cancelText: this.translate.instant(
        'ORGANIZATION.REQUESTS.REFUSEMODAL.CANCEL'
      ),
      confirmText: this.translate.instant(
        'ORGANIZATION.REQUESTS.REFUSEMODAL.CONFIRM'
      ),
      waitDesciption: this.translate.instant(
        'ORGANIZATION.REQUESTS.REFUSEMODAL.WAIT'
      )
    };

    this.confirmDialogservice.open(options);
    this.confirmDialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        let id = user.id;
        let grpId = user.groups[0].group.id;
        const refuseRequestSub = this.organizationService
          .RefuseIssuerRequests(id, grpId)
          .subscribe(
            (res) => {
              if (res.success) {
                this.notification.push({
                  message: this.translate.instant(
                    'ORGANIZATION.SUCCESSMESSAGES.REJECTREQUEST'
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
                type: 'success'
              });
            }
          );
        this.subsriptions.push(refuseRequestSub);
      }
    });
  }

  approveRequest(user) {
    const options = {
      title: this.translate.instant('ORGANIZATION.REQUESTS.ACCEPTMODAL.TITLE'),
      message: this.translate.instant(
        'ORGANIZATION.REQUESTS.ACCEPTMODAL.MESSAGE'
      ),
      cancelText: this.translate.instant(
        'ORGANIZATION.REQUESTS.ACCEPTMODAL.CANCEL'
      ),
      confirmText: this.translate.instant(
        'ORGANIZATION.REQUESTS.ACCEPTMODAL.CONFIRM'
      ),
      waitDesciption: this.translate.instant(
        'ORGANIZATION.REQUESTS.ACCEPTMODAL.WAIT'
      )
    };

    this.confirmDialogservice.open(options);
    this.confirmDialogservice.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        let id = user.id;
        const acceptRequestSub = this.organizationService
          .AcceptIssuerRequest(id)
          .subscribe(
            (res) => {
              if (res.success) {
                this.notification.push({
                  message: this.translate.instant(
                    'ORGANIZATION.SUCCESSMESSAGES.ACCEPTREQUEST'
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
                type: 'success'
              });
            }
          );
        this.subsriptions.push(acceptRequestSub);
      }
    });
  }

  SelectedGroup({ cat }: { cat: any }) {
    this.Categories = [];
    let itemIndex = this.GroupesOfOrganization.findIndex(
      (item) => item.name === cat.user.value
    );

    this.categories.forEach((element) => {
      if (element.issuer === this.GroupesOfOrganization[itemIndex].issuer) {
        this.Categories.push(element);
      }
    });
  }

  ngOnDestroy() {
    this.subsriptions.forEach((sb) => sb.unsubscribe());
  }
}
