import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-revoke-certificate',
  templateUrl: './revoke-certificate.component.html',
  styleUrls: ['./revoke-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevokeCertificateComponent extends DumbComponent {
  revokeCertificatesForm: FormGroup = new FormGroup({
    reason: new FormControl('', Validators.required)
  });
  isRevoking = false;
  //function that emit revoke form
  @Output() revokeForm = new EventEmitter();

  constructor() {
    super();
  }

  get rf() {
    return this.revokeCertificatesForm.controls;
  }
  /**
   * Emit Revoke Certificate Form to view certificate
   *
   * @returns void
   */
  onRevokeForm() {
    this.isRevoking = true;
    this.revokeForm.emit(this.revokeCertificatesForm.value.reason);
  }
}
