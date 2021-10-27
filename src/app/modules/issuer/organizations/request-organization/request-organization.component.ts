import { AffiliationDetails, IAffiliation } from './../../../../models/User';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-organization',
  templateUrl: './request-organization.component.html',
  styleUrls: ['./request-organization.component.scss']
})
export class RequestOrganizationComponent implements OnInit {
  @Input() ListeOrganizations;
  @Output() requestOrganization = new EventEmitter();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}
  organization: FormGroup = new FormGroup({
    organization: new FormControl('', [Validators.required])
  });

  closePupUp() {
    this.dialog.closeAll();
  }

  sendRequest() {
    let orgenization: AffiliationDetails = {
      id: this.organization.value.organization.id,
      name: this.organization.value.organization.name
    };
    let group: AffiliationDetails = {
      id: '',
      name: ''
    };
    let affiliation: IAffiliation = {
      group: group,
      organization: orgenization
    };
    this.requestOrganization.emit(affiliation);
    this.closePupUp();
  }
  ngOnInit(): void {}
}
