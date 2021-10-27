import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

export let EmailValidator =
  (utilsService: UtilsService): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) return null;

    const isEmail = utilsService.isEmail(email);
    if (!isEmail) {
      return { emailInvalid: 'Email invalid' };
    }

    return null;
  };
