import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { CategoryModel } from 'src/app/modules/issuer/category/Category.model';

@Component({
  selector: 'app-upload-recipients',
  templateUrl: './upload-recipients.component.html',
  styleUrls: ['./upload-recipients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadRecipientsComponent extends DumbComponent {
  uploadRecipientsForm: FormGroup = new FormGroup({
    categories1Control: new FormControl('', Validators.required),
    fileFormatControl: new FormControl('', Validators.required),
    categories2Control: new FormControl('', Validators.required),
    designControl: new FormControl('', Validators.required)
  });
  @Input() category$!: Observable<CategoryModel[]>;
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() uploadDataEvent: EventEmitter<any[]> = new EventEmitter();
  public fb: FormBuilder = new FormBuilder();

  constructor() {
    super();
  }

  UploadDataEvent(e) {
    this.uploadDataEvent.emit(e);
  }
  GetObservable = (data) => of(data);
  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
