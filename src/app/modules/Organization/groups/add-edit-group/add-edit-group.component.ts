import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { Observable } from 'rxjs';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';
import { SignerModel } from 'src/app/modules/signer/Signer.model';
import { IssuerModel } from 'src/app/modules/issuer/Issuer.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GroupModel } from '../../../../models/Organization';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent extends DumbComponent {
  @Input() group!: GroupModel;
  @Input() issuers$!: Observable<IssuerModel[]>;
  @Input() signers$!: Observable<SignerModel[]>;
  @Input() recipients$!: Observable<RecipientModel[]>;

  @Input() Updating!: boolean;
  @Input() sendingCredit = false;
  isLoading = false;

  AddEditForm: FormGroup = new FormGroup({});
  creditForm: FormGroup = new FormGroup({});

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() editGroupEvent: EventEmitter<any> = new EventEmitter();
  @Output() AddGroupEvent: EventEmitter<GroupModel> = new EventEmitter();
  @Output() sendCreditEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }
  @Input() orgCredit: number = 0;

  isSendDisabled: boolean = false;
  NoChange: boolean = true;

  @Input() set _AddEditForm(formGroup: FormGroup) {
    this.AddEditForm = formGroup;
  }

  @Input() set _creditForm(formGroup: FormGroup) {
    this.creditForm = formGroup;
  }

  public get Name(): FormControl {
    return this.AddEditForm.get('name') as FormControl;
  }
  public get Issuer(): FormControl {
    return this.AddEditForm.get('issuerControl') as FormControl;
  }
  public get Signers(): FormControl {
    return this.AddEditForm.get('signersControl') as FormControl;
  }
  public get Recipients(): FormControl {
    return this.AddEditForm.get('recipientsControl') as FormControl;
  }
  public get Organization(): FormControl {
    return this.AddEditForm.get('organizationControl') as FormControl;
  }
  public get Description(): FormControl {
    return this.AddEditForm.get('descriptionControl') as FormControl;
  }
  public get Credit(): FormControl {
    return this.creditForm.get('credit') as FormControl;
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }

  editGroup() {
    this.isLoading = true;
    let form = this.AddEditForm.value;
    let name = form.name || this.group.name;
    let newGroup: GroupModel = {
      id: this.group.id,
      organization: this.group.organization,
      name: name.trim().toLowerCase(),
      issuer: form.issuerControl || '',
      recipients: form.recipientsControl || [],
      signers: form.signersControl || [],
      description: form.descriptionControl.trim().toLowerCase(),
      credits: this.group.credits
    };

    let data = {
      groupId: this.group.id,
      newGroup: newGroup
    };
    this.editGroupEvent.emit(data);
  }

  addGroup() {
    this.isLoading = true;
    let form = this.AddEditForm.value;
    let group: GroupModel = {
      organization: '',
      name: form.name.trim().toLowerCase(),
      issuer: form.issuerControl || '',
      recipients: form.recipientsControl || [],
      signers: form.signersControl || [],
      description: form.descriptionControl.trim().toLowerCase(),
      credits: form.credit || 0
    };
    this.AddGroupEvent.emit(group);
  }

  checkCredit(event) {
    let creditV: number = parseInt(event.target.value);
    if (creditV === this.group.credits) {
      this.NoChange = true;
      this.isSendDisabled = false;
    } else {
      this.NoChange = false;
    }
    if (creditV > this.orgCredit && this.group.credits < this.orgCredit) {
      this.isSendDisabled = true;
    } else if (
      this.group.credits > this.orgCredit &&
      creditV > this.group.credits &&
      creditV > this.orgCredit + this.group.credits
    ) {
      this.isSendDisabled = true;
    } else if (this.orgCredit === 0 && this.group.credits < creditV) {
      this.isSendDisabled = true;
    } else {
      this.isSendDisabled = false;
    }
  }

  sendCredit(group) {
    this.isLoading = true;
    let data = {
      creditValue: this.creditForm.value.credit,
      group: group
    };
    this.sendCreditEvent.emit(data);
  }
}
