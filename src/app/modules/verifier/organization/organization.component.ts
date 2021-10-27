import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Organization } from 'src/app/models/Organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent extends SmartComponent {
  @ViewChild('content') content!: TemplateRef<any>;
  NoData;
  displayedRows$!: any[];
  ListeOrganizations!: Observable<Organization[]>;
  constructor(public dialog: MatDialog) {
    super();
  }

  RequestOrganization() {
    this.dialog.open(this.content, {
      disableClose: true,
      width: '50%'
    });
  }
}
