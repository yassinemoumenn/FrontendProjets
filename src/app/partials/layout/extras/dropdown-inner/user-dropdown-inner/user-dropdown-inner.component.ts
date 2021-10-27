import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { User } from '../../../../../models/User';
import { AuthenticationService } from '../../../../../modules/auth/authentication.service';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss']
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$!: Observable<User | null>;

  constructor(
    private layout: LayoutService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
