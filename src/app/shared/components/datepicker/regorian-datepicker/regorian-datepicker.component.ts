import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { Input, Injectable } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Injectable()
@Component({
  selector: 'app-regorian-datepicker',
  templateUrl: './regorian-datepicker.component.html',
  styleUrls: ['./regorian-datepicker.component.scss']
})
export class RegorianDatepickerComponent
  implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string;

  @Input() formControl;

  @Input() isRequired!: boolean;
  @Output() SelectedDate = new EventEmitter();

  @Input() label: string = 'Choose a date';
  @Input() appearance: 'legacy' | 'fill' | 'standard' | 'outline' = 'outline';
  @Input() footerTemplate!: TemplateRef<any>;
  constructor() {}
  private innerValue!: string;
  private changed: any[] = [];
  private touched: any[] = [];
  private disabled!: boolean;

  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach((f) => f(value));
    }
  }

  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.touched.push(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.innerValue = obj;
  }
  ngOnInit(): void {}

  onDateSelect(v) {
    this.SelectedDate.emit(v);
  }
}
