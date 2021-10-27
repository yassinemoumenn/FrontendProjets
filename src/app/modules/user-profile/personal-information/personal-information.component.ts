import { SnackbarModel } from './../../../shared/components/snackbar/snackbar.model';
import { SnackbarService } from './../../../shared/components/snackbar/snackbar.service';
import { UserProfileService } from './../user-profile.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../../auth/authentication.service';
import { formatDate } from '@angular/common';
import { EmailValidator } from '../../issuer/sub-issuer/email-validation';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { ValidationPhoneEmail } from '../../issuer/recipients/validation-phone-email';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  icon_name: string = 'add_ic_call';

  formGroup!: FormGroup;
  user!: User;
  firstUserState?: User;
  subscriptions: Subscription[] = [];
  avatarPic = 'none';
  isLoading$: Observable<boolean>;
  maDate?: string;

  maxDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);

  url: string = '';

  phoneInfo?: Country;

  pictureChanged: boolean = false;

  constructor(
    private userService: AuthenticationService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private _snackbarService: SnackbarService,
    private utilsService: UtilsService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  oldValueUser: any;
  ngOnInit(): void {
    const sb = this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.url =
          user?.picture || user?.picture !== ''
            ? user?.picture ?? './assets/no-user.png'
            : './assets/no-user.png';
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
        this.loadForm();
        this.oldValueUser = this.formGroup.value;
      });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadForm() {
    this.maDate = formatDate(this.user.birthday, 'YYYY-MM-dd', 'en-US');

    this.formGroup = this.fb.group(
      {
        picture: [this.user.picture],

        firstname: [
          this.user.firstname,
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ]
          }
        ],
        lastname: [
          this.user.lastname,
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100)
            ]
          }
        ],
        birthday: [this.maDate, [Validators.required]],

        phone: this.fb.group({
          name: '',
          iso2: '',
          placeHolder: [
            this.user.phone?.placeHolder ?? '',
            {
              asyncValidators: [
                this.existingPhoneValidator(this.user.phone?.placeHolder)
              ]
            }
          ],
          flagClass: '',
          dialCode: '',
          priority: ''
        }),
        email: [
          this.user.email,
          {
            validators: [EmailValidator(this.utilsService)],
            asyncValidators: [this.existingEmailValidator(this.user.email)],
            updateOn: 'blur'
          }
        ]
      },
      {
        validators: [ValidationPhoneEmail]
      }
    );

    if (this.user.role === 'ISSUER' || this.user.role === 'SIGNER') {
      this.formGroup.addControl('signature', new FormControl(''));
    }
  }

  CountryChanged(e: Country) {
    this.phoneInfo = e;
    this.setupPhone();
  }

  setupPhone() {
    this.formGroup.get('phone.name')?.setValue(this.phoneInfo?.name);
    this.formGroup.get('phone.iso2')?.setValue(this.phoneInfo?.iso2);

    this.formGroup.get('phone.flagClass')?.setValue(this.phoneInfo?.flagClass);
    this.formGroup.get('phone.dialCode')?.setValue(this.phoneInfo?.dialCode);
    this.formGroup.get('phone.priority')?.setValue(this.phoneInfo?.priority);
  }

  TrimValues() {
    let firstname = this.formGroup.get('firstname');
    let lastname = this.formGroup.get('lastname');
    let email = this.formGroup.get('email');

    firstname?.setValue(firstname?.value.trim().toLowerCase());
    lastname?.setValue(lastname?.value.trim().toLowerCase());
    email?.setValue(email?.value.trim());
  }

  btnIsLoading: boolean = false;

  save(e) {
    if (!this.formGroup.valid) {
      return;
    }

    this.setupPhone();

    this.TrimValues();

    const formValues = this.formGroup.value;
    formValues.email = this.formGroup.value.email?.trim().toLowerCase();
    formValues.firstname = this.formGroup.value.firstname?.trim().toLowerCase();
    formValues.lastname = this.formGroup.value.lastname?.trim().toLowerCase();

    this.user = Object.assign(this.user, formValues);

    this.userService.currentUserSubject.next(Object.assign({}, this.user));

    let id = this.user.id;

    if (this.user.email === this.formGroup.get('email')?.value)
      delete formValues.email;
    const updateAccountSettings = this.userProfileService
      .updateUser(id, formValues)
      .subscribe(
        (msg) => {
          const message: SnackbarModel = {
            message: 'USER_PROFILE.PERSONAL_INFO.BODY.msgSuccess',
            type: 'success'
          };
          this._snackbarService.push(message);
          this.route.navigate(['/user-profile', 'overview'], {
            relativeTo: this.activatedRoute
          });
        },
        (err) => {
          const message: SnackbarModel = {
            message: err.message,
            type: 'error'
          };
          this._snackbarService.push(message);
        }
      );

    this.subscriptions.push(updateAccountSettings);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
    this.route.navigate(['/user-profile', 'overview'], {
      relativeTo: this.activatedRoute
    });
  }
  onselectfile(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.url = reader.result as string;
        this.user.picture = this.url;
        this.pictureChanged = true;

        this.formGroup.patchValue({
          picture: reader.result
        });
      };
    }
  }

  urlSignature: string = '';
  msg: string = '';
  uploadSignature(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.urlSignature = reader.result as string;
        (this.user as any).signature = this.urlSignature;
        this.pictureChanged = true;
        this.msg = 'Signature uploaded successfully';
        this.formGroup.patchValue({
          signature: reader.result
        });
      };
    }
  }

  deletePic() {
    this.user.picture = undefined;
    this.formGroup.get('picture')?.setValue('');
    this.url = './assets/no-user.png';
    this.pictureChanged = true;
  }

  public get FirstName(): FormControl {
    return this.formGroup.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.formGroup.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }
  public get Phone(): FormControl {
    return this.formGroup.get('phone.placeHolder') as FormControl;
  }
  public get Birthday(): FormControl {
    return this.formGroup.get('birthday') as FormControl;
  }

  showSpinnerEmail: boolean = false;
  existingEmailValidator(email: string | undefined): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        (email === undefined || email !== control.value)
      ) {
        this.showSpinnerEmail = true;
        return this.userService.ValidateEmail(control.value).pipe(
          delay(400),
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
  existingPhoneValidator(phone: string | undefined): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        control.value !== null &&
        (phone === undefined || phone !== control.value)
      ) {
        this.showSpinnerPhone = true;
        let _phone = {
          dialCode: this.formGroup.get('phone.dialCode')?.value,
          flagClass: this.formGroup.get('phone.flagClass')?.value,
          iso2: this.formGroup.get('phone.iso2')?.value,
          name: this.formGroup.get('phone.name')?.value,
          placeHolder: control.value,
          priority: this.formGroup.get('phone.priority')?.value
        };
        return this.userService.ValidatePhone(_phone).pipe(
          delay(400),
          map((resp) => {
            this.showSpinnerPhone = false;
            return resp.data ? { alreadyTaken: 'Phone already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }
}
