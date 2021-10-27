import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-organization-types',
  templateUrl: './organization-types.component.html',
  styleUrls: ['./organization-types.component.scss']
})
export class OrganizationTypesComponent {
  account: string = 'ISSUERORGANIZATION';
  constructor(private authService: AuthenticationService) {}

  changeAccount(accountType) {
    this.account = accountType;
    this.authService.setTypeOrganization(this.account);
  }
}
