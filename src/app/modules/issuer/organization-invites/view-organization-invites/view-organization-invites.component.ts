import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAffiliation } from 'src/app/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-organization-invites',
  templateUrl: './view-organization-invites.component.html',
  styleUrls: ['./view-organization-invites.component.scss']
})
export class ViewOrganizationInvitesComponent extends DumbComponent {
  @Input() displayedRows$!: Observable<IAffiliation[]>;
  @Output() acceptClicked = new EventEmitter();
  //function that emit reject request
  @Output() rejectClicked = new EventEmitter();

  public columns = ['group', 'organization', 'date', 'actions'];

  constructor() {
    super();
  }

  OnAcceptClicked(orgid) {
    this.acceptClicked.emit(orgid);
  }
  OnRejectClicked(orgid) {
    this.rejectClicked.emit(orgid);
  }
}
