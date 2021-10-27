import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { GroupModel } from 'src/app/models/Organization';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.scss']
})
export class ViewGroupsComponent {
  @Input() Groups$!: Observable<any[]>;
  @Input() orgCredit: number = 0;
  @Output() DataSort = new EventEmitter();

  @Output() editEvent = new EventEmitter<GroupModel>();

  @Output() deleteEvent = new EventEmitter<string>();

  @Output() SendCreditEvent = new EventEmitter<GroupModel>();

  fm!: FormGroup;

  groups: GroupModel[] = [];

  groupToUpdate!: GroupModel;

  Collapsed: any[] = [];

  sortData(sort: any) {
    this.DataSort.emit(sort);
  }

  public columns = [
    'name',
    'issuer',
    'recipients',
    'signers',
    'credit',
    'actions'
  ];

  constructor() {}
  Edit(group) {
    this.editEvent.emit(group);
  }

  Delete(groupId) {
    this.deleteEvent.emit(groupId);
  }

  SendCredit(group) {
    this.SendCreditEvent.emit(group);
  }

  Collapse(id) {
    this.Collapsed.push(id);
  }
  close(id) {
    for (let i = 0; i < this.Collapsed.length; i++) {
      if (this.Collapsed[i] === id) {
        this.Collapsed.splice(i, 1);
      }
    }
  }
}
