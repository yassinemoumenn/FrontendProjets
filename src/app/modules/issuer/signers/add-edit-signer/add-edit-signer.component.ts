import { SignerModel } from './../../../signer/Signer.model';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-add-edit-signer',
  templateUrl: './add-edit-signer.component.html',
  styleUrls: ['./add-edit-signer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditSignerComponent extends DumbComponent {
  @Input() data: any;
  @Input() title: string = '';
  @Input() action: string = '';
  signerFG: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  @Input() set _signerFG(signerFormGroup: FormGroup) {
    this.signerFG = signerFormGroup;
  }

  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);

  @Output() addSigner: EventEmitter<{
    data: any;
  }> = new EventEmitter();

  @Output() editSigner: EventEmitter<{
    id: number;
    data: any;
  }> = new EventEmitter();

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);
  constructor() {
    super();
  }

  Submit(e) {
    if (e && this.signerFG.valid) {
      this.isLoading = true;
      let signer: SignerModel = this.signerFG.value;
      this.signerFG.value.firstname = signer.firstname.trim().toLowerCase();
      this.signerFG.value.lastname = signer.lastname.trim().toLowerCase();
      this.signerFG.value.email = signer.email?.trim().toLowerCase();
      this.signerFG.value.username = signer.username?.trim().toLowerCase();
      this.signerFG.value.occupation = signer.occupation?.trim().toLowerCase();
      if (this.action.trim().toLowerCase() === 'add') {
        this.addSigner.emit({
          data: this.signerFG.value
        });
      } else {
        this.signerFG.removeControl('password');
        this.editSigner.emit({
          id: this.data?.id,
          data: this.signerFG.value
        });
      }
    }
  }

  public get FirstName(): FormControl {
    return this.signerFG.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.signerFG.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.signerFG.get('email') as FormControl;
  }
  public get Phone(): FormControl {
    return this.signerFG.get('phone') as FormControl;
  }
  public get Birthday(): FormControl {
    return this.signerFG.get('birthday') as FormControl;
  }
  public get Occupation(): FormControl {
    return this.signerFG.get('occupation') as FormControl;
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }
}
