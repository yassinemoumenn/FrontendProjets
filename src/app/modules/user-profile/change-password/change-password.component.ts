import { UserProfileService } from './../user-profile.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../../auth/authentication.service';
import { ConfirmPasswordValidator } from '../../auth/registration/confirm-password.validator';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { SnackbarModel } from 'src/app/shared/components/snackbar/snackbar.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  user!: User;
  firstUserState?: User;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  showAlert: boolean = true;

  passwordregex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/gm;

  constructor(
    private userService: AuthenticationService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private _snackbarService: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this.userService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group(
      {
        currentPassword: [
          '',
          {
            validators: Validators.compose([Validators.required]),
            updateOn: 'change'
          }
        ],

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

        cPassword: ['', Validators.required]
      },
      {
        validators: ConfirmPasswordValidator.MatchPassword()
      }
    );
  }

  public get CurrentPassword(): FormControl {
    return this.formGroup.get('currentPassword') as FormControl;
  }
  public get NewPassword(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }
  public get ConfirmPassword(): FormControl {
    return this.formGroup.get('cPassword') as FormControl;
  }

  @ViewChild('currentPassword') currentPassword!: ElementRef;
  btnIsLoading: boolean = false;
  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;

    let id = this.user.id;
    let passwordBody = {
      oldPassword: formValues.currentPassword,
      newPassword: formValues.password
    };
    const updatePassword = this.userProfileService
      .changePassword(id, passwordBody)
      .subscribe(
        (result) => {
          const message: SnackbarModel = {
            message: 'USER_PROFILE.CHANGE_PASSWORD.BODY.msgSuccess',
            type: 'success'
          };
          this._snackbarService.push(message);
          this.formGroup.reset();
        },
        (error) => {
          if (error.error.message === 'Old Password Is Incorrect') {
            this.btnIsLoading = false;
            this.formGroup.get('currentPassword')?.setErrors({
              oldPasswordIncorrect:
                'USER_PROFILE.CHANGE_PASSWORD.BODY.msgCurrentPasswordIncorrect'
            });
          }
        }
      );

    this.subscriptions.push(updatePassword);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
    this.router.navigate(['/user-profile', 'overview'], {
      relativeTo: this.activatedRoute
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
