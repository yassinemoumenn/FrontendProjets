import { Activiytservice } from './../../../../../shared/services/Activity.service';
import { IActivity, User } from '../../../../../models/User';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists-widget9',
  templateUrl: './lists-widget9.component.html',
  styleUrls: ['./lists-widget9.component.css'],
  providers: [Activiytservice]
})
export class ListsWidget9Component implements OnInit {
  user$!: Observable<User>;
  userActivities: IActivity[] = [];
  userId?: string;
  constructor(private activityService: Activiytservice) {}

  ngOnInit(): void {
    this.userActivities = this.activityService.activities;
    this.activityService.activitiesfiltered.subscribe((activities) => {
      this.userActivities = activities;
    });
  }
}
