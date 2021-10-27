import { Activiytservice } from './../../../../shared/services/Activity.service';
import { Component, OnInit } from '@angular/core';
import { IActivity } from 'src/app/models/User';

@Component({
  selector: 'app-dropdown-menu1',
  templateUrl: './dropdown-menu1.component.html'
})
export class DropdownMenu1Component implements OnInit {
  constructor(private activityservice: Activiytservice) {}
  activities?: IActivity[];

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  onFilterActivities(type: number) {
    if (type in [0, 1, 2]) {
      this.activities = this.activityservice.activities.filter(
        (item) => item.activityType === type
      );
    } else {
      this.activities = this.activityservice.activities;
    }
    this.activityservice.activitiesfiltered.next(this.activities);
  }
}
