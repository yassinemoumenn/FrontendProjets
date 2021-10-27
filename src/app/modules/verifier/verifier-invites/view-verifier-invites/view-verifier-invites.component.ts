import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-view-verifier-invites',
  templateUrl: './view-verifier-invites.component.html',
  styleUrls: ['./view-verifier-invites.component.scss']
})
export class ViewVerifierInvitesComponent extends DumbComponent {
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
