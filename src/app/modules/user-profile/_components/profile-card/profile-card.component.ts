import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'src/app/models/Organization';
import { User, Gender } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { OrganizationService } from 'src/app/modules/Organization/organization.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user$!: Observable<User | null>;
  user!: User | null;
  male = Gender.MALE;
  female = Gender.FEMALE;

  organization$!: Observable<Organization | null>;
  organization!: Organization | null;

  credits: number = -1;
  countStop: any;
  constructor(
    public authService: AuthenticationService,
    private organizationService: OrganizationService
  ) {
    this.user$ = this.authService.currentUserSubject.asObservable();
  }
  ngOnInit(): void {
    this.organization$ =
      this.authService.currentOrganizationSubject.asObservable();
    this.user = this.authService.currentUserValue;
    this.organization = this.authService.currentOrganizationValue;

    if (
      this.user?.role === 'ADMIN' &&
      this.organization?.type?.toLowerCase() === 'issuerorganization'
    )
      this.organizationService
        .getAllGroups()
        .pipe(
          map((data) =>
            data.data.reduce((sum, current) => sum + current.credits, 0)
          )
        )
        .subscribe((digit) => this.animateCount(digit));
  }

  animateCount(digit) {
    if (digit === 0) {
      this.credits = 0;
      return;
    }
    this.credits = 1;
    clearInterval(this.countStop);
    this.countStop = setInterval(
      () => {
        if (digit >= 2000) {
          if (this.credits === Math.round(digit / 20)) {
            clearInterval(this.countStop);
            this.credits = digit;
            return;
          }
        } else if (digit >= 200) {
          if (this.credits === Math.round(digit / 4)) {
            clearInterval(this.countStop);
            this.credits = digit;
            return;
          }
        } else {
          if (this.credits === digit) {
            clearInterval(this.countStop);
            return;
          }
        }
        this.credits++;
      },
      digit >= 2000 ? 0.5 : 1
    );
  }
}
