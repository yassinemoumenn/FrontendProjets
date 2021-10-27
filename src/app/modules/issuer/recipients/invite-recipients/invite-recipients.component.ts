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
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-invite-recipients',
  templateUrl: './invite-recipients.component.html',
  styleUrls: ['./invite-recipients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteRecipientsComponent extends DumbComponent {
  spinnerIsShow: boolean = false;
  emptyList: boolean = true;

  allRecipient: any[] = [];
  @Input() set events(data: any) {
    if (this.recipCtrl.value && this.recipCtrl.value !== '') {
      this.emptyList = false;
      this.allRecipient = data.data.content;
    } else {
      this.emptyList = true;
      this.allRecipient = [];
    }
    this.filteredRecipients = this.recipCtrl.valueChanges.pipe(
      startWith(null),
      map((recip: string | null) => {
        if (recip) {
          return this._filter(recip);
        }
        return this.allRecipient.slice();
      })
    );
    this.spinnerIsShow = false;
  }

  @Input() categories: any[] = [];

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() searchRecipient: EventEmitter<string> = new EventEmitter();
  @Output() inviteRecipients: EventEmitter<any> = new EventEmitter();
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredRecipients?: Observable<any[]>;
  _recipients: any[] = [];

  @ViewChild('recipientInput') recipientInput!: ElementRef<HTMLInputElement>;

  recipCtrl: FormControl = new FormControl('', Validators.required);
  categoriesFC: FormControl = new FormControl('');

  constructor() {
    super();
  }

  onKeyUp() {
    this.spinnerIsShow = true;
    if (this.recipCtrl.value === '') {
      this.filteredRecipients = of([]);
      this.spinnerIsShow = false;
      return;
    }
    this.searchRecipient.emit(this.recipCtrl.value);
  }

  remove(recip: string): void {
    const index = this._recipients.indexOf(recip);
    if (this.recipCtrl.value === null) {
      this.emptyList = true;
    }
    if (index >= 0) {
      this.searchRecipient.emit(this.recipCtrl.value);
      this._recipients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let recipient = this.allRecipient.find(
      (reci) => reci.id === event.option.value
    );
    let index = this._recipients.find((reci) => reci.id === recipient.id);
    if (!index) {
      this._recipients.push(recipient);
    }
    this.recipientInput.nativeElement.value = '';
    this.recipCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let allR = this.allRecipient.filter(
      (recip) =>
        recip.firstname.toLowerCase().includes(filterValue) ||
        recip.lastname.toLowerCase().includes(filterValue)
    );
    return allR;
  }

  InviteRecipients() {
    let recipientsIds = this._recipients.map((rec) => rec.id);
    let categories = this.categories.filter(
      (cat) => this.categoriesFC.value.indexOf(cat.name) !== -1
    );
    this.inviteRecipients.emit({
      recipients: recipientsIds,
      categories: categories
    });
  }

  public get GetCategories(): string[] {
    return this.categories.map((cat) => cat.name);
  }

  public get Categories(): FormControl {
    return this.categoriesFC;
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
