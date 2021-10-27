import { SnackbarService } from './../../../shared/components/snackbar/snackbar.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, INotification } from 'src/app/models/User';
import { AuthenticationService } from '../../auth/authentication.service';
import { UserProfileService } from '../user-profile.service';
import { SnackbarModel } from 'src/app/shared/components/snackbar/snackbar.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TwoFactorComponent } from '../../auth/two-factor/two-factor.component';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  user!: User;
  firstUserState?: User;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private userService: AuthenticationService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private _snackbarService: SnackbarService,
    private dialog: MatDialog,
    private route: Router,
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

    if (!this.user.phone?.placeHolder)
      this.formGroup.get('twoFactorAuthentication')?.disable();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadForm() {
    if (this.user.accountSettings === null) {
      this.formGroup = this.fb.group({
        emailNotification: [false],
        phoneNotification: [false],
        twoFactorAuthentication: [false],
        passwordResetVerification: [false]
      });
    } else {
      this.formGroup = this.fb.group({
        emailNotification: [
          this.user.accountSettings.notification.email ||
          (this.user.accountSettings.notification.email &&
            this.user.accountSettings.notification.sms)
            ? true
            : false
        ],
        phoneNotification: [
          this.user.accountSettings.notification?.sms ||
          (this.user.accountSettings.notification.email &&
            this.user.accountSettings.notification.sms)
            ? true
            : false
        ],
        twoFactorAuthentication: [
          this.user.accountSettings.twoFactorAuthentication
        ],
        passwordResetVerification: [
          this.user.accountSettings.passwordResetVerification
        ]
      });
    }

    this.formGroup.setValidators(this.atLeastOneValidator());
  }

  private atLeastOneValidator = () => {
    return (formGroup) => {
      let emailControl = formGroup.controls['emailNotification'].value;
      let phoneControl = formGroup.controls['phoneNotification'].value;

      if (!emailControl && !phoneControl) {
        return {
          atLeastOneRequired: {
            text: 'At least one should be selected'
          }
        };
      }
      return null;
    };
  };

  btnIsLoading: boolean = false;
  save() {
    this.btnIsLoading = true;
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;

    let notification: INotification =
      formValues.emailNotification && formValues.phoneNotification
        ? { email: true, sms: true }
        : formValues.emailNotification && !formValues.phoneNotification
        ? { email: true }
        : { sms: true };
    let newAccountSettings = {
      notification: notification,
      twoFactorAuthentication: formValues.twoFactorAuthentication,
      passwordResetVerification: formValues.passwordResetVerification
    };

    this.user = Object.assign(this.user, {
      accountSettings: newAccountSettings
    });
    this.userService.currentUserSubject.next(Object.assign({}, this.user));

    let id = this.user.id;

    const updateAccountSettings = this.userProfileService
      .updateUser(id, {
        accountSettings: newAccountSettings
      })
      .subscribe((User) => {
        const message: SnackbarModel = {
          message: 'USER_PROFILE.ACCOUNT_SETTINGS.BODY.msgSuccess',
          type: 'success'
        };
        this._snackbarService.push(message);
        this.route.navigate(['/user-profile', 'overview'], {
          relativeTo: this.activatedRoute
        });
      });
    this.subscriptions.push(updateAccountSettings);
    this.userService.isLoadingSubject.next(false);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
    this.route.navigate(['/user-profile', 'overview'], {
      relativeTo: this.activatedRoute
    });
  }

  SwitchLoginVerification(checked) {
    if (checked) {
      let dialogSms;
      if (this.user.accountSettings === null) {
        if (this.user.phone?.placeHolder) {
          this.userService
            .SendCodeSms(this.user.phone?.placeHolder, 'en')
            .subscribe((data) => {
              this._snackbarService.push({
                message: 'verification code sent successfully',
                type: 'success'
              });
              dialogSms = this.dialog.open(TwoFactorComponent, {
                width: '40%',
                panelClass: ['padding-0'],
                position: {
                  top: '3%'
                },
                data: {
                  phone: this.user.phone?.placeHolder,
                  email: this.user.email,
                  dialog: this.dialog
                }
              });
              dialogSms.afterClosed().subscribe((data) => {
                this.formGroup.get('twoFactorAuthentication')?.setValue(false);
                if (data.success) {
                  this.formGroup.get('twoFactorAuthentication')?.setValue(true);
                }
              });
            });
        }
      } else {
        this.formGroup.get('twoFactorAuthentication')?.setValue(checked);
      }
    }
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
}
