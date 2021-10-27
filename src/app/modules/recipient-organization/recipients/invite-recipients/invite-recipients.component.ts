import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';
import { Page } from 'src/app/models/helpers/Page';

@Component({
  selector: 'app-invite-recipients',
  templateUrl: './invite-recipients.component.html',
  styleUrls: ['./invite-recipients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteRecipientsComponent extends DumbComponent {
  emptyList: boolean = true;

  @Input() set _allRecipient(data: Observable<Page<RecipientModel>>) {
    this.filteredRecipients = data;
  }

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() inviteRecipients: EventEmitter<any> = new EventEmitter();
  @Output() serachRecipient: EventEmitter<string> = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRecipients?: Observable<Page<RecipientModel>>;
  _recipients: RecipientModel[] = [];
  @ViewChild('recipientInput') recipientInput!: ElementRef<HTMLInputElement>;
  recipCtrl: FormControl = new FormControl('', Validators.required);

  constructor() {
    super();
  }

  onKeyUp() {
    if (this.recipCtrl.value === '') {
      this.filteredRecipients = of();
      return;
    }
    this.emptyList = false;
    let search = this.recipCtrl.value as string;
    this.serachRecipient.emit(search);
  }

  remove(recip: RecipientModel): void {
    const index = this._recipients.indexOf(recip);
    if (this.recipCtrl.value === null) {
      this.emptyList = true;
    }
    if (index >= 0) {
      this._recipients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let recipient = event.option.value;
    let index = this._recipients.find((reci) => reci.id === recipient?.id);
    if (!index) {
      this._recipients.push(recipient);
    }
    this.filteredRecipients = of();
    this.recipientInput.nativeElement.value = '';
    this.recipCtrl.setValue(null);
  }

  InviteRecipients() {
    let recipientsIds = this._recipients.map((rec) => rec.id);

    this.inviteRecipients.emit({
      recipients: recipientsIds
    });
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
