import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationsService } from './organizations.service';
import { Organization } from 'src/app/models/Organization';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  constructor(
    private userService: AuthenticationService,
    public dialog: MatDialog,
    private readonly _organizationService: OrganizationsService
  ) {}

  @ViewChild('content') content!: TemplateRef<any>;
  displayedRows$!: any[];
  curantuser;
  public pageIndex: number = 0;
  public pageSize: number = 5;
  public length!: number;

  organizations: Organization[] = [];
  ListOrganizationNonDoesNotBelongToCurrentIssuer: any[] = [];
  ngOnInit(): void {
    this._organizationService.getOrganizations().subscribe((result) => {
      this.organizations = result.data;
      console.log('this.organizations ', this.organizations);
      this.length = this.organizations.length;
      this.displayedRows$ = this.getCategoriesPgonation(
        this.pageIndex,
        this.pageSize
      );
    });

    this._organizationService
      .ListOrganizationNonDoesNotBelongToCurrentIssuer()
      .subscribe((result) => {
        this.ListOrganizationNonDoesNotBelongToCurrentIssuer =
          result.data['content'];
      });
  }

  close(): void {
    this.dialog.closeAll();
  }
  NoData: boolean = false;
  ApplySearch(filter) {
    if (filter !== undefined) {
      let list: any = [];
      list = this.organizations.filter(
        (it) =>
          it.name.toLowerCase().includes(filter.toLowerCase()) ||
          it.domain?.toLowerCase().includes(filter.toLowerCase()) ||
          it.location?.toLowerCase().includes(filter.toLowerCase()) ||
          it.website?.toLowerCase().includes(filter.toLowerCase())
      );

      this.displayedRows$ = list;
      if (list.length === 0) {
        this.NoData = true;
      }
    } else {
      this.displayedRows$ = this.getCategoriesPgonation(
        this.pageIndex,
        this.pageSize
      );
      this.NoData = false;
    }
  }

  RequestOrganization() {
    this.dialog.open(this.content, {
      disableClose: true,
      width: '50%'
    });
  }
  getCategoriesPgonation(pageIndex, pageSize) {
    let ListE: any = [];
    for (
      let index = pageIndex * pageSize;
      index < pageIndex * pageSize + pageSize;
      index++
    ) {
      let cc = this.organizations[index];

      if (cc !== undefined) {
        ListE.push(cc);
      }
    }
    return ListE;
  }
  paginationCategory({ paginator }: { paginator: any }) {
    this.pageIndex = paginator.pageIndex;
    this.pageSize = paginator.pageSize;

    this.displayedRows$ = this.getCategoriesPgonation(
      paginator.pageIndex,
      paginator.pageSize
    );
  }
  requestOrganization({ org }: { org: any }) {
    this._organizationService.sendRequest(org).subscribe((res) => {});

    this._organizationService
      .ListOrganizationNonDoesNotBelongToCurrentIssuer()
      .subscribe((result) => {
        this.ListOrganizationNonDoesNotBelongToCurrentIssuer =
          result.data['content'];
      });
  }
}
