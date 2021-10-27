import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export let ValidateUsername =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    let username = control.value as string;
    let regex = /\s/g;

    return username.match(regex)
      ? { containWhiteSpace: 'Username cannot contain spaces' }
      : null;
  };
