import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

export let UrlValidator =
  (utilsService: UtilsService): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    if (!url) return null;

    const isurl = utilsService.isUrl(url);
    if (!isurl) {
      return { urlInvalid: 'url invalid' };
    }

    return null;
  };
