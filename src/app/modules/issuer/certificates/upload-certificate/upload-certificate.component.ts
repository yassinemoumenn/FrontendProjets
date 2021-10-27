import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';
import { CategoryModel } from '../../category/Category.model';
import { DesignModel } from '../../Designs/Design.model';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.scss']
})
export class UploadCertificateComponent extends DumbComponent {
  uploadCertificatesForm: FormGroup = new FormGroup({
    categories1Control: new FormControl('', Validators.required),
    fileFormatControl: new FormControl('', Validators.required),
    categories2Control: new FormControl('', Validators.required),
    designControl: new FormControl('', Validators.required)
  });
  @Input() category$!: Observable<CategoryModel[]>;
  @Input() recipientToUpload$!: Observable<RecipientModel[]>;
  @Input() AllDesigns$!: Observable<DesignModel[]>;
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() uploadCertificateData = new EventEmitter();

  public fb: FormBuilder = new FormBuilder();

  constructor() {
    super();
  }
  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }

  uploadObject(e) {
    this.uploadCertificateData.emit(e);
  }
}
