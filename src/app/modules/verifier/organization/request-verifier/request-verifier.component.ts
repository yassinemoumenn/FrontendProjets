import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { Organization } from 'src/app/models/Organization';

@Component({
  selector: 'app-request-verifier',
  templateUrl: './request-verifier.component.html',
  styleUrls: ['./request-verifier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestVerifierComponent extends DumbComponent {
  organization: FormGroup = new FormGroup({
    organization: new FormControl('', [Validators.required])
  });
  @Input() ListeOrganizations!: Observable<Organization[]>;
  @Output() requestOrganization = new EventEmitter();

  constructor() {
    super();
  }
  SendRequest() {
    this.requestOrganization.emit(this.organization.value);
  }
}
