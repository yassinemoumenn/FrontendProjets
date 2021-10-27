import { User } from 'src/app/models/User';
import { of, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GroupModel } from 'src/app/models/Organization';

@Component({
  selector: 'app-affect-user',
  templateUrl: './affect-user-to-group.component.html',
  styleUrls: ['./affect-user-to-group.component.scss']
})
export class AffectUserToGroupComponent implements OnInit {
  @Input() user!: User;
  @Input() groups: GroupModel[] = [];
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() affectUserEvent: EventEmitter<any> = new EventEmitter();

  groups$!: Observable<any[]>;
  isLoading = false;
  isMultiple = false;

  @Input() UserForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.groups$ = of(this.groups);
    if (this.user.role === 'ISSUER') {
      this.isMultiple = false;
    } else {
      this.isMultiple = true;
    }
  }
  AffectUser() {
    this.isLoading = true;
    if (this.user.role === 'ISSUER') {
      this.UserForm.value.groupesCL = [this.UserForm.value.groupesCL];
    }
    let data = {
      userId: this.user.id,
      groups: this.UserForm.value.groupesCL
    };

    this.affectUserEvent.emit(data);

    setTimeout(() => {
      this.dismissDialog.emit(true);
      this.isLoading = false;
    }, 500);
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
