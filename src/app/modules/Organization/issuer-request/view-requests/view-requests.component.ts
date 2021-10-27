import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss']
})
export class ViewRequestsComponent extends DumbComponent {
  @Input() displayedRows$!: Observable<any[]>;
  @Input() curentOrg;
  @Output() approveEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  public columns = ['issuer', 'phone', 'occupation', 'requestDate', 'actions'];

  public editUser!: FormGroup;
  constructor() {
    super();
  }

  approveRequest(issuer) {
    this.approveEvent.emit(issuer);
  }
  cancelRequest(issuer) {
    this.cancelEvent.emit(issuer);
  }
}
