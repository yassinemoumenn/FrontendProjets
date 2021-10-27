import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  account: string = 'organizationTypes';

  changeAccount(accountType) {
    this.account = accountType;
  }
}
