import { Component, OnInit } from '@angular/core';
import { SubheaderService } from 'src/app/partials/layout/subheader/_services/subheader.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(private subheader: SubheaderService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.subheader.setTitle('User Profile');
      this.subheader.setBreadcrumbs([
        {
          title: 'User profile',
          linkText: 'User profile',
          linkPath: '/user-profile'
        }
      ]);
    }, 1);
  }
}
