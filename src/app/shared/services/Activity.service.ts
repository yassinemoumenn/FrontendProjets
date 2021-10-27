import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityType, IActivity } from 'src/app/models/User';
@Injectable({
  providedIn: 'root'
})
export class Activiytservice {
  activitiesfiltered = new Subject<IActivity[]>();
  activities: IActivity[] = [
    {
      activityType: ActivityType.ACCOUNT_ACTIVATED,
      timestamp: '11:00'
    },
    {
      activityType: ActivityType.UPLOAD_CERTIFICATES,
      timestamp: '12:00'
    },
    {
      activityType: ActivityType.CERTIFICATE_VALIDATED,
      timestamp: '02:00'
    },
    {
      activityType: ActivityType.UPLOAD_CERTIFICATES,
      timestamp: '12:00'
    },
    {
      activityType: ActivityType.CERTIFICATE_VALIDATED,
      timestamp: '02:00'
    },
    {
      activityType: ActivityType.UPLOAD_CERTIFICATES,
      timestamp: '12:00'
    },
    {
      activityType: ActivityType.CERTIFICATE_VALIDATED,
      timestamp: '02:00'
    },
    {
      activityType: ActivityType.UPLOAD_CERTIFICATES,
      timestamp: '12:00'
    }
  ];
}
