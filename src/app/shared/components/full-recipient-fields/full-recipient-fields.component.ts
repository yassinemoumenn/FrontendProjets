import {
  AfterViewInit,
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
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-full-recipient-fields',
  templateUrl: './full-recipient-fields.component.html',
  styleUrls: ['./full-recipient-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullRecipientFieldsComponent
  extends DumbComponent
  implements AfterViewInit {
  @Input() recipientDataToFull: any;
  fb: FormBuilder = new FormBuilder();
  recipientFieldsForm: FormGroup = new FormGroup({});
  //function that emit recipient field form
  @Output() fullRecipientFieldForm = new EventEmitter();
  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.recipientFieldsForm = this.fb.group({});
    this.recipientDataToFull.category.fields.recipient.forEach((element) => {
      // eslint-disable-next-line no-unused-expressions
      element.type !== 'number'
        ? this.recipientFieldsForm.addControl(
            element.name,
            new FormControl(element.value ?? '')
          )
        : this.recipientFieldsForm.addControl(
            element.name,
            new FormControl(element.value ?? '', Validators.pattern('^[0-9]*$'))
          );
    });
  }
  fullRecipientFields() {
    this.recipientDataToFull.category.fields.recipient.forEach((element) => {
      element['value'] = this.recipientFieldsForm.value[element['name']];
    });
    if (this.recipientDataToFull.data.categories !== undefined) {
      this.recipientDataToFull.data.categories.forEach((element) => {
        if (element.id === this.recipientDataToFull.category.id) {
          element.fields.recipient = this.recipientDataToFull.category.fields.recipient;
        }
      });
      this.recipientDataToFull.data.categories.forEach((cat) => {
        cat.isActive = true;
        (cat as any).active = true;
        cat.fields.recipient.forEach((field) => {
          if (field.value === '') {
            cat.isActive = false;
            (cat as any).active = false;
          }
        });
      });

      this.fullRecipientFieldForm.emit(this.recipientDataToFull.data);
    } else {
      this.fullRecipientFieldForm.emit(this.recipientDataToFull.data);
    }
  }
}
