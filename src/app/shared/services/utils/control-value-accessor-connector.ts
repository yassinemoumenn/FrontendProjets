import {
  ControlContainer,
  ControlValueAccessor,
  FormControl
} from '@angular/forms';
import { Directive, Injector, Input } from '@angular/core';

@Directive({})
export class ControlValueAccessorConnector implements ControlValueAccessor {
  // @ViewChild(FormControlDirective, { static: true })
  // formControlDirective!: FormControlDirective;

  @Input()
  formControl: FormControl = new FormControl();

  @Input()
  formControlName!: string;

  get control() {
    return (this.controlContainer.control!.get(this.formControlName) ||
      this.formControl) as FormControl;
  }

  constructor(private injector: Injector) {}

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  registerOnTouched(fn: any): void {
    // this.formControlDirective.valueAccessor!.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    // this.formControlDirective.valueAccessor!.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    // this.formControlDirective.valueAccessor!.writeValue(obj);
  }
}
