import { IPhone } from './../../../../models/User';
import { AuthenticationService } from './../../authentication.service';
import { atLeastOne } from '../custom-validator.directive';
import { ConfirmPasswordValidator } from '../confirm-password.validator';
import KTWizard from '../../../../../assets/js/components/wizard';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { delay, first, map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { ValidationPhoneEmail } from 'src/app/modules/issuer/recipients/validation-phone-email';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { EmailValidator } from 'src/app/modules/issuer/sub-issuer/email-validation';
import { ValidateUsername } from 'src/app/modules/recipient-organization/recipients/validate-username';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('wizard', { static: true }) el!: ElementRef;
  step: number = 1;
  hasError1: boolean = false;
  hasError2: boolean = false;
  hasError3: boolean = false;
  CountryPhoneCode: string = '';
  submitted: boolean = false;
  selectedOption?: string;
  registrationForm!: FormGroup;
  hasError?: boolean;
  isLoading$: Observable<boolean>;
  disabled: boolean = true;
  startDate: Date = new Date(1980, 1, 1);
  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);
  currentStep = 1;
  initialCountry = 'us';

  roles: string[] = ['ISSUER', 'VERIFIER', 'RECIPIENT'];
  passwordregex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/gm;
  phone!: IPhone;
  wizard: any;
  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.test();
  }
  test() {
    this.registrationForm.valueChanges.pipe(delay(500)).subscribe((result) => {
      switch (this.currentStep) {
        case 1:
          // eslint-disable-next-line no-unused-expressions
          this.registrationForm.get('accountInfo')?.valid
            ? (this.disabled = false)
            : (this.disabled = true);
          break;
        case 2:
          // eslint-disable-next-line no-unused-expressions
          this.registrationForm.controls['personalInfo'].valid &&
          this.PersonalInfo.controls['agree'].value
            ? (this.disabled = false)
            : (this.disabled = true);
          break;
        default:
          this.disabled = true;
          break;
      }
    });
  }

  ngAfterViewInit() {
    // Initialize form wizard

    this.wizard = new KTWizard(this.el.nativeElement, {
      startStep: 0
    });
    // Change event
    this.wizard.on('change', (wizard) => {
      this.currentStep = wizard.getStep();
      let newStep = wizard.getNewStep();
      if (newStep > this.currentStep) {
        this.currentStep = newStep;
        if (newStep === 2) {
          // eslint-disable-next-line no-unused-expressions
          this.registrationForm.controls['personalInfo'].valid &&
          this.PersonalInfo.controls['agree'].value
            ? (this.disabled = false)
            : (this.disabled = true);
        }
        this.test();
      }
      if (newStep < this.currentStep) {
        this.currentStep = newStep;
        this.disabled = false;
        this.test();
      }
    });
  }
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group({
      accountInfo: this.fb.group(
        {
          email: [
            '',
            {
              validators: [EmailValidator(this.utilsService)],
              asyncValidators: [this.existingEmailValidator()],
              updateOn: 'blur'
            }
          ],
          phone: this.fb.group({
            name: '',
            iso2: '',
            placeHolder: [
              '',
              {
                asyncValidators: [this.existingPhoneValidator()],
                updateOn: 'change'
              }
            ],
            flagClass: '',
            dialCode: '',
            priority: ''
          }),
          password: [
            '',
            {
              validators: Validators.compose([
                Validators.required,
                Validators.pattern(this.passwordregex)
              ]),
              updateOn: 'change'
            }
          ],
          cPassword: [
            '',
            {
              validators: Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(100)
              ]),
              updateOn: 'change'
            }
          ]
        },
        {
          validators: [
            ConfirmPasswordValidator.MatchPassword(),
            ValidationPhoneEmail
          ],
          updateOn: 'blur'
        }
      ),
      personalInfo: this.fb.group({
        firstname: [
          '',
          {
            validators: Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ]),
            updateOn: 'change'
          }
        ],
        lastname: [
          '',
          {
            validators: Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ]),
            updateOn: 'change'
          }
        ],
        username: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              ValidateUsername()
            ],
            asyncValidators: [this.existingUserNameValidator()],
            updateOn: 'blur'
          }
        ],
        birthday: ['', Validators.compose([Validators.required])],
        role: ['', Validators.compose([Validators.required])],
        agree: [false, Validators.compose([Validators.required])]
      })
    });
  }

  /**
   *  Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */

  public get Email(): FormControl {
    return this.registrationForm.get('accountInfo.email') as FormControl;
  }
  public get Username(): FormControl {
    return this.registrationForm.get('personalInfo.username') as FormControl;
  }
  public get Firstname(): FormControl {
    return this.registrationForm.get('personalInfo.firstname') as FormControl;
  }
  public get Lastname(): FormControl {
    return this.registrationForm.get('personalInfo.lastname') as FormControl;
  }
  public get Password(): FormControl {
    return this.registrationForm.get('accountInfo.password') as FormControl;
  }

  public get CPassword(): FormControl {
    return this.registrationForm.get('accountInfo.cPassword') as FormControl;
  }
  public get Phone(): FormControl {
    return this.registrationForm.get(
      'accountInfo.phone.placeHolder'
    ) as FormControl;
  }

  public get Birthday(): FormControl {
    return this.registrationForm.get('personalInfo.birthday') as FormControl;
  }

  public get Role(): FormControl {
    return this.registrationForm.get('personalInfo.role') as FormControl;
  }

  public get AccountInfo(): FormGroup {
    return this.registrationForm.controls['accountInfo'] as FormGroup;
  }
  public get PersonalInfo(): FormGroup {
    return this.registrationForm.controls['personalInfo'] as FormGroup;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registrationForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  CountryChange(event) {
    this.CountryPhoneCode = event.dialCode;
    this.initialCountry = event.iso2;
    this.phone = event;
    this.setupPhone();
  }

  setupPhone() {
    this.registrationForm
      .get('accountInfo.phone.name')
      ?.setValue(this.phone?.name);
    this.registrationForm
      .get('accountInfo.phone.iso2')
      ?.setValue(this.phone?.iso2);
    this.registrationForm
      .get('accountInfo.phone.flagClass')
      ?.setValue(this.phone?.flagClass);
    this.registrationForm
      .get('accountInfo.phone.dialCode')
      ?.setValue(this.phone?.dialCode);
    this.registrationForm
      .get('accountInfo.phone.priority')
      ?.setValue(this.phone?.priority);
  }

  submit() {
    this.setupPhone();

    let address: any;
    let accountSetting: any;
    let user: User = {
      firstname: this.Firstname?.value.trim().toLowerCase(),
      lastname: this.Lastname?.value.trim().toLowerCase(),
      username: this.Username?.value.trim().toLowerCase(),
      birthday: new Date(
        this.Birthday?.value.year,
        this.Birthday?.value.month,
        this.Birthday?.value.day
      ),
      password: this.CPassword?.value,
      email: this.Email?.value.trim().toLowerCase(),
      phone: this.AccountInfo.controls['phone']?.value,
      groups: [],
      role: this.Role?.value,
      address: address,
      accountSettings: accountSetting
    };

    const registrationSubscr = this.authService
      .registration(user)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res.username) {
            let user = res;
            this.router.navigate(['/']);
            this.hasError = false;
            const loginSubscr = this.authService
              .login(user.username, user.password)
              .pipe(first())
              .subscribe(
                (user: User) => {
                  this.router.navigate(['/']);
                },
                (err) => {
                  this.hasError = true;
                  throw new Error('error');
                }
              );
            this.unsubscribe.push(loginSubscr);
          } else {
            this.hasError = true;
          }
        },
        (error) => {
          console.log(
            'you have a console.log(JSON.stringify(_phone));n error ',
            error
          );
        }
      );

    this.unsubscribe.push(registrationSubscr);
  }

  showSpinnerUsername: boolean = false;
  existingUserNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control && control.value !== '') {
        this.showSpinnerUsername = true;
        return this.authService.ValidateUsername(control.value).pipe(
          map((resp) => {
            this.showSpinnerUsername = false;
            return resp.data
              ? { alreadyTaken: 'Username already taken' }
              : null;
          })
        );
      }
      return of(null);
    };
  }
  showSpinnerEmail: boolean = false;
  existingEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control && control.value !== '') {
        this.showSpinnerEmail = true;
        return this.authService.ValidateEmail(control.value).pipe(
          map((resp) => {
            this.showSpinnerEmail = false;
            return resp.data ? { alreadyTaken: 'Email already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }

  showSpinnerPhone: boolean = false;
  existingPhoneValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control && control.value !== '' && control.value !== null) {
        this.showSpinnerPhone = true;
        let _phone = {
          dialCode: this.registrationForm.get('accountInfo.phone.dialCode')
            ?.value,
          flagClass: this.registrationForm.get('accountInfo.phone.flagClass')
            ?.value,
          iso2: this.registrationForm.get('accountInfo.phone.iso2')?.value,
          name: this.registrationForm.get('accountInfo.phone.name')?.value,
          placeHolder: control.value,
          priority: this.registrationForm.get('accountInfo.phone.priority')
            ?.value
        };

        return this.authService.ValidatePhone(_phone).pipe(
          map((resp) => {
            this.showSpinnerPhone = false;
            return resp.data ? { alreadyTaken: 'Phone already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
