import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { User, Gender } from '../../../../../models/User';
import { AuthenticationService } from '../../../../../modules/auth/authentication.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss']
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$!: Observable<User | null>;
  male = Gender.MALE;
  female = Gender.FEMALE;

  constructor(
    private layout: LayoutService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  logout() {
    this.auth.logout().subscribe();
  }
}
