import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Organization } from 'src/app/models/Organization';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss']
})
export class ProfileOverviewComponent implements OnInit {
  user!: Observable<User | null>;
  organization!: Observable<Organization | null>;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user));
    this.organization =
      this.authService.currentOrganizationSubject.asObservable();
  }

  EditPersonalInfo() {
    this.route.navigate(['/user-profile', 'personal-information'], {
      relativeTo: this.activatedRoute
    });
  }

  EditOrganizationInfo() {
    this.route.navigate(['/user-profile', 'organization-information'], {
      relativeTo: this.activatedRoute
    });
  }

  GetCommuniocationWay(user: User | null): string {
    let communication = '';
    if (user?.accountSettings?.notification?.sms) communication += 'Phone, ';

    if (user?.accountSettings?.notification?.email) communication += 'Email, ';
    if (user?.accountSettings?.notification?.app)
      communication += 'Application ';
    if (communication === '') communication = 'none';

    return communication.trim().lastIndexOf(',') + 1 ===
      communication.trim().length
      ? communication.trim().substring(0, communication.trim().length - 1)
      : communication.trim();
  }

  AccountSettings() {
    this.route.navigate(['/user-profile', 'account-information'], {
      relativeTo: this.activatedRoute
    });
  }
}
