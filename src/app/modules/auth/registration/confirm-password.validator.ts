import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;

      const confirmPassword = control.get('cPassword')?.value;

      if (password !== confirmPassword) {
        control.get('cPassword')?.setErrors({ ConfirmPassword: true });
        return { ConfirmPassword: true };
      } else {
        return null;
      }
    };
  }
}
