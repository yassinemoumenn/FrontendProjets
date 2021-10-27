import { AbstractControl, ValidationErrors } from '@angular/forms';

export let ValidationPhoneEmail = (
  fg: AbstractControl
): ValidationErrors | null => {
  const phone = fg.get('phone.placeHolder');
  const email = fg.get('email');

  if (email?.value === '' && phone?.value === '') {
    email?.setErrors({
      requiredFeild: 'USER_PROFILE.PERSONAL_INFO.BODY.msgEtherEmaolOrPhone'
    });
  }
  if (email?.value === '' && phone?.value !== '') {
    email?.setErrors(null);
  }
  return null;
};
