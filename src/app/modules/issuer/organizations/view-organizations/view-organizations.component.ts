import { Component, Input } from '@angular/core';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TranslateService } from '@ngx-translate/core';
import { Organization } from 'src/app/models/Organization';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-view-organizations',
  templateUrl: './view-organizations.component.html',
  styleUrls: ['./view-organizations.component.scss']
})
export class ViewOrganizationsComponent {
  @Input() displayedRows$!: Organization[];

  treeControl = new NestedTreeControl<any>((node) => node.categories);
  dataSource = new MatTreeNestedDataSource<any>();

  hasChild = (_: number, node: any) =>
    !!node.categories && node.categories.length > 0;

  TITELE;
  cancelText;
  confirmText;
  constructor(
    private auth: AuthenticationService,
    public dialogservice: ConfirmDialogService,
    translate: TranslateService
  ) {
    translate.get('ISSUER.ORGANIZATION').subscribe((text: string) => {
      this.TITELE = text['LEAVEORGANIZATION'];
      this.cancelText = text['CANCEL'];
      this.confirmText = text['CONFIRM'];
    });
  }
  public columns = ['name', 'groups', 'domain', 'state', 'webSite', 'Address'];

  currentUser;

  sb = this.auth.currentUserSubject
    .asObservable()
    .pipe(first((user) => !!user))
    .subscribe((user) => {
      this.currentUser = Object.assign({}, user);
    });

  getOrganizationStat(id): string {
    const g = this.currentUser.groups.find((x) => x.organization.id === id);

    return g.accountState;
  }
}
