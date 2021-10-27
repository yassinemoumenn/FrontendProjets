import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-organization-selector',
  templateUrl: './organization-selector.component.html',
  styleUrls: ['./organization-selector.component.scss']
})
export class OrganizationSelectorComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}
  currentUser;
  categories: any;
  sb = this.auth.currentUserSubject
    .asObservable()
    .pipe(first((user) => !!user))
    .subscribe((user) => {
      this.currentUser = Object.assign({}, user);
    });
  organizations: any[] = [];
  @Output() switchOrganization = new EventEmitter();
  ngOnInit(): void {
    this.currentUser.groups.forEach((element) => {
      this.organizations.push(element.organization);
    });
  }

  Switch(org) {
    let group = this.currentUser.groups.find(
      (x) => x.organization.id === org.id
    );
    let id = group.group.id;
    this.switchOrganization.emit(group.group.id);
    window.location.reload();
  }
}
