import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Observable, Subscription } from 'rxjs';
import { RecipientService } from '../recipient.service';

@Component({
  selector: 'app-organization-invites',
  templateUrl: './organization-invites.component.html',
  styleUrls: ['./organization-invites.component.scss']
})
export class OrganizationInvitesComponent extends SmartComponent implements OnInit, OnDestroy {
  constructor(
    private snackbarService: SnackbarService,
    private recipienService: RecipientService,
    private changeDetectorRefs: ChangeDetectorRef,

  ) { super(); }

  displayedRows$!: Observable<any[]>;
  subscriptions: Subscription[] = [];

  public pageIndex: number = 0;
  public pageSize: number = 5;
  public length!: number;
  NoData: boolean = false;
  invites: any[] = [];
  ngOnInit(): void {

    this.init();
  }

  ApplySearch(filter) {
    if (filter !== undefined) {
      let list: any = [];
      list = this.invites.filter(
        (it) =>
          it.name.toLowerCase().includes(filter.toLowerCase()) ||
          it.type.toLowerCase().includes(filter.toLowerCase()) ||
          it.date ||
          it.domain.toLowerCase().includes(filter.toLowerCase())
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
    const sb1 = this.recipienService.ListInvites().subscribe((result) => {
      this.invites = result.data;
      this.NoData = this.invites.length > 0 ? false : true;
      this.length = this.invites.length;
      this.displayedRows$ = this.getInvitesPagination(
        this.pageIndex,
        this.pageSize
      );

    });
    this.subscriptions.push(sb1);
    this.changeDetectorRefs.detectChanges()

  }
  acceptInvite(inv) {
    if (inv.invite.type === "RecipientOrganization") {
      const sb2 = this.recipienService.AcceptOrganizationInvite(inv.invite.id).subscribe((res) => {

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
        })
      this.subscriptions.push(sb2);

    } else {
      const sb3 = this.recipienService.AcceptIssuerInvite(inv.invite.id).subscribe((res) => {

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
        })
      this.subscriptions.push(sb3);

    }

  }
  rejectInvite(inv) {
    if (inv.invite.type === "RecipientOrganization") {
      const sb2 = this.recipienService.RefuseIssuerInvite(inv.invite.group.id).subscribe((res) => {

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
        })
      this.subscriptions.push(sb2);
    } else {
      const sb3 = this.recipienService.RefuseIssuerInvite(inv.invite.group.id).subscribe((res) => {


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
        })
      this.subscriptions.push(sb3);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}





