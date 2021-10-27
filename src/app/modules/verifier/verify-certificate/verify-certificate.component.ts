import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-verify-certificate',
  templateUrl: './verify-certificate.component.html',
  styleUrls: ['./verify-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyCertificateComponent
  extends DumbComponent
  implements AfterViewInit
{
  fb: FormBuilder = new FormBuilder();
  verifyForm: FormGroup = new FormGroup({});
  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.verifyForm = this.fb.group({
      certificateID: ['', Validators.required]
    });
  }
}
