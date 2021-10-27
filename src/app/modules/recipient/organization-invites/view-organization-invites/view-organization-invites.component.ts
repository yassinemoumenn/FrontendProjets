import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IAffiliation } from 'src/app/models/User';

@Component({
  selector: 'app-view-organization-invites',
  templateUrl: './view-organization-invites.component.html',
  styleUrls: ['./view-organization-invites.component.scss']
})
export class ViewOrganizationInvitesComponent extends DumbComponent {

  @Input() displayedRows$!: Observable<any[]>;
  @Output() acceptClicked = new EventEmitter();
  //function that emit reject request
  @Output() rejectClicked = new EventEmitter();

  public columns = ['name', 'domain', 'type', 'date', 'actions'];

  constructor() {
    super();
  }


  OnAcceptClicked(invite) {
    this.acceptClicked.emit(invite);
  }
  OnRejectClicked(invite) {
    this.rejectClicked.emit(invite);
  }
}


