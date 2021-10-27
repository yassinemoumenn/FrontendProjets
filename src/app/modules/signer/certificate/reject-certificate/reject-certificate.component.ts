import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-reject-certificate',
  templateUrl: './reject-certificate.component.html',
  styleUrls: ['./reject-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RejectCertificateComponent extends DumbComponent {
  rejectCertificatesForm: FormGroup = new FormGroup({
    reason: new FormControl('', Validators.required)
  });
  isRevoking = false;
  //function that emit reject form
  @Output() rejectForm = new EventEmitter();
  constructor() {
    super();
  }

  get rf() {
    return this.rejectCertificatesForm.controls;
  }
  /**
   * Emit Reject Certificate Form to view certificate
   *
   * @returns void
   */
  onRejectForm() {
    this.isRevoking = true;
    this.rejectForm.emit(this.rejectCertificatesForm.value.reason);
  }
}
