import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-add-subissuer',
  templateUrl: './add-subissuer.component.html',
  styleUrls: ['./add-subissuer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubissuerComponent extends DumbComponent {
  @Input() data: any;
  @Input() positions: string[] = [];
  @Input() permissions: string[] = [];
  @Input() title: string = '';
  @Input() action: string = '';

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);

  @Output() addSubIssuer: EventEmitter<{
    data: any;
  }> = new EventEmitter();

  @Output() editSubIssuer: EventEmitter<{
    id: number;
    data: any;
  }> = new EventEmitter();

  subIssuerFG: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  @Input() set _subIssuerFG(subIssuerFormGroup: FormGroup) {
    this.subIssuerFG = subIssuerFormGroup;
  }

  constructor() {
    super();
  }

  Submit(e) {
    if (e && this.subIssuerFG.valid) {
      this.isLoading = true;
      if (this.action.trim().toLowerCase() === 'add')
        this.addSubIssuer.emit({
          data: this.subIssuerFG.value
        });
      else
        this.editSubIssuer.emit({
          id: this.data?.id,
          data: this.subIssuerFG.value
        });
      setTimeout(() => {
        this.dismissDialog.emit(true);
      }, 2000);
    }
  }

  public get FirstName(): FormControl {
    return this.subIssuerFG.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.subIssuerFG.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.subIssuerFG.get('email') as FormControl;
  }
  public get Phone(): FormControl {
    return this.subIssuerFG.get('phone') as FormControl;
  }
  public get Position(): FormControl {
    return this.subIssuerFG.get('position') as FormControl;
  }
  public get Permissions(): FormControl {
    return this.subIssuerFG.get('permissions') as FormControl;
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
