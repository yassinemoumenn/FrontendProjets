import { User } from 'src/app/models/User';
import { IssuerOrganization } from 'src/app/modules/Organization/models/IssuerOrganization';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent extends DumbComponent {
  @Input() curentOrg!: IssuerOrganization;
  @Input() displayedRows$!: Observable<User[]>;
  @Output() UserToUpdate = new EventEmitter();
  @Output() changeStateEvent = new EventEmitter();
  @Output() UserToDElete = new EventEmitter();
  @Output() ImpersonateEvent = new EventEmitter();
  @Output() affectToGroupEvent = new EventEmitter();
  public columns = [
    'name',
    'email',
    'phone',
    'Date of birth',
    'role',
    'state',
    'Actions'
  ];

  public editUser!: FormGroup;
  constructor() {
    super();
  }

  EditUser(user) {
    this.UserToUpdate.emit(user);
  }

  deleteUser(user) {
    this.UserToDElete.emit(user);
  }

  Impersonate(user) {
    this.ImpersonateEvent.emit(user);
  }

  ChangeState(user: User, accountSate) {
    let data = {
      user: user,
      state: accountSate
    };
    this.changeStateEvent.emit(data);
  }

  affectToGroup(user) {
    this.affectToGroupEvent.emit(user);
  }

  getAccountState(user) {
    let accoutstate;
    let affiliations = user.groups;
    if (affiliations.length > 0) {
      let orgAffiiation = affiliations.filter(
        (a) => a.organization.id === this.curentOrg.id
      );
      orgAffiiation.forEach((element) => {
        if (element.group && element.accountState) {
          accoutstate = element.accountState;
        }
      });
    }
    return accoutstate;
  }

  checkIfAffectDisabled(user): boolean {
    let disabled = false;
    let affiliations = user.groups;
    if (affiliations.length > 0) {
      let orgAffiiation = affiliations.filter(
        (a) => a.organization.id === this.curentOrg.id
      );
      orgAffiiation.forEach((element) => {
        if (element.group) {
          if (user.role === 'ISSUER') {
            disabled = true;
          } else {
            disabled = false;
          }
        }
      });
    } else {
      disabled = false;
    }
    return disabled;
  }
}
