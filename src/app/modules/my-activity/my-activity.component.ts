import { Component, OnInit } from '@angular/core';
import { Activiytservice } from './../../shared/services/Activity.service';
import { IActivity, User } from '../../models/User';
import { Observable } from 'rxjs';
import { SubheaderService } from 'src/app/partials/layout/subheader/_services/subheader.service';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.scss'],
  providers: [Activiytservice]
})
export class MyActivityComponent implements OnInit {
  user$!: Observable<User>;
  userActivities: IActivity[] = [];
  userId?: string;
  constructor(
    private activityService: Activiytservice,
    private subheader: SubheaderService
  ) {}

  ngOnInit(): void {
    this.subheader.setTitle('My Activity');
    this.subheader.setBreadcrumbs([
      {
        title: 'My Activity',
        linkText: 'My Activity',
        linkPath: '/my-activity'
      }
    ]);
    this.userActivities = this.activityService.activities;
  }
}
