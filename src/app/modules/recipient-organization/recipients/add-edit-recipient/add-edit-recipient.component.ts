import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';

@Component({
  selector: 'app-add-edit-recipient',
  templateUrl: './add-edit-recipient.component.html',
  styleUrls: ['./add-edit-recipient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditRecipientComponent extends DumbComponent {
  @Input() data: any;
  @Input() organizations: any;

  phoneInfo?: Country;

  @Input() showSpinnerEmail!: boolean;
  @Input() showSpinnerUsername!: boolean;
  @Input() showSpinnerPhone!: boolean;

  @Input() title: string = '';
  @Input() action: string = '';
  recipientFG: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  @Input() set _recipientFG(recipientFormGroup: FormGroup) {
    this.recipientFG = recipientFormGroup;
  }

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);

  @Output() addRecipient: EventEmitter<RecipientModel> = new EventEmitter();

  @Output() editRecipient: EventEmitter<{
    id: number;
    data: any;
  }> = new EventEmitter();

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);

  constructor() {
    super();
  }

  Submit(e) {
    if (e && this.recipientFG.valid) {
      this.isLoading = true;
      this.setupPhone();
      let recipient: RecipientModel = this.recipientFG.value;
      recipient.firstname = recipient.firstname.trim().toLowerCase();
      recipient.lastname = recipient.lastname.trim().toLowerCase();
      recipient.email = recipient.email?.trim().toLowerCase();
      recipient.username = recipient.username?.trim().toLowerCase();
      if (this.action.trim().toLowerCase() === 'add') {
        this.addRecipient.emit(recipient);
      } else {
        if (this.data.email === recipient.email) delete recipient.email;
        if (this.data.phone.placeHolder === recipient.phone?.placeHolder)
          delete recipient.phone;
        this.editRecipient.emit({
          id: this.data?.id,
          data: recipient
        });
      }
    }
  }

  CountryChanged(e: Country) {
    this.phoneInfo = e;
    this.setupPhone();
  }

  setupPhone() {
    this.recipientFG.get('phone.name')?.setValue(this.phoneInfo?.name);
    this.recipientFG.get('phone.iso2')?.setValue(this.phoneInfo?.iso2);
    this.recipientFG
      .get('phone.flagClass')
      ?.setValue(this.phoneInfo?.flagClass);
    this.recipientFG.get('phone.dialCode')?.setValue(this.phoneInfo?.dialCode);
    this.recipientFG.get('phone.priority')?.setValue(this.phoneInfo?.priority);
  }

  public get FirstName(): FormControl {
    return this.recipientFG.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.recipientFG.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.recipientFG.get('email') as FormControl;
  }
  public get Phone(): FormControl {
    return this.recipientFG.get('phone.placeHolder') as FormControl;
  }
  public get Username(): FormControl {
    return this.recipientFG.get('username') as FormControl;
  }
  public get Birthday(): FormControl {
    return this.recipientFG.get('birthday') as FormControl;
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
