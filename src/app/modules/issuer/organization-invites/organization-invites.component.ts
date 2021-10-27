import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { IAffiliation } from 'src/app/models/User';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-invites',
  templateUrl: './organization-invites.component.html',
  styleUrls: ['./organization-invites.component.scss']
})
export class OrganizationInvitesComponent
  extends SmartComponent
  implements OnInit, OnDestroy
{
  constructor(
    private snackbarService: SnackbarService,
    private readonly _organizationService: OrganizationsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    super();
  }

  displayedRows$!: Observable<any[]>;
  subscriptions: Subscription[] = [];

  public pageIndex: number = 0;
  public pageSize: number = 5;
  public length!: number;
  NoData: boolean = false;
  invites: IAffiliation[] = [];
  ngOnInit(): void {
    this.init();
  }

  ApplySearch(filter) {
    if (filter !== undefined) {
      let list: any = [];
      list = this.invites.filter(
        (it) =>
          it.group.name.toLowerCase().includes(filter.toLowerCase()) ||
          it.organization.name.toLowerCase().includes(filter.toLowerCase()) ||
          it.date
      );

      this.displayedRows$ = list;
      if (list.length === 0) {
        this.NoData = true;
      }
    } else {
      this.displayedRows$ = this.getInvitesPagination(
        this.pageIndex,
        this.pageSize
      );
      this.NoData = false;
    }
  }

  getInvitesPagination(pageIndex, pageSize) {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = this.invites[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return ListE;
  }
  paginationInvites({ paginator }: { paginator: any }) {
    this.pageIndex = paginator.pageIndex;
    this.pageSize = paginator.pageSize;

    this.displayedRows$ = this.getInvitesPagination(
      paginator.pageIndex,
      paginator.pageSize
    );
  }
  init() {
    const sb = this._organizationService
      .ListOrganizationInvites()
      .subscribe((result) => {
        this.invites = result.data;
        this.NoData = this.invites.length > 0 ? false : true;
        this.length = this.invites.length;
        this.displayedRows$ = this.getInvitesPagination(
          this.pageIndex,
          this.pageSize
        );
        this.changeDetectorRefs.detectChanges();
      });
    this.subscriptions.push(sb);
  }
  acceptInvite(org) {
    const sb = this._organizationService
      .AcceptOrganizationInvite(org.orgid)
      .subscribe(
        (res) => {
          this.snackbarService.push({
            message: 'Invite accepted successfully',
            type: 'success'
          });
          this.init();
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
        }
      );

    this.subscriptions.push(sb);
  }
  rejectInvite(org) {
    const sb = this._organizationService
      .RefuseOrganizationInvite(org.orgid)
      .subscribe(
        (res) => {
          this.snackbarService.push({
            message: 'Invite rejected successfully',
            type: 'success'
          });
          this.init();
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
        }
      );
    this.subscriptions.push(sb);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
