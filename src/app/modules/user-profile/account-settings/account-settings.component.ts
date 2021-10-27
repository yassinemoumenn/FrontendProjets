import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  user!: User;
  firstUserState!: User;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private userService: AuthenticationService,
    private fb: FormBuilder
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
    this.formGroup = this.fb.group({
      emailNotification: [this.user.accountSettings],
      sendCopyToPersonalEmail: [this.user.accountSettings],
      newNotifications: [this.user.accountSettings],
      directMessage: [this.user.accountSettings],
      newConnection: [this.user.accountSettings]
    });
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      return;
    }

    const formValues = this.formGroup.value;
    this.user = Object.assign(this.user, {
      accountSettings: {
        emailNotification: formValues.emailNotification,
        sendCopyToPersonalEmail: formValues.sendCopyToPersonalEmail,
        activityRelatesEmail: {
          newNotifications: formValues.newNotifications,
          directMessage: formValues.directMessage,
          newConnection: formValues.newConnection,
          uponNewOrder: formValues.uponNewOrder,
          newMembershipApproval: formValues.newMembershipApproval,
          memberRegistration: formValues.memberRegistration
        }
      }
    });

    // Do request to your server for user update, we just imitate user update there
    this.userService.isLoadingSubject.next(true);
    setTimeout(() => {
      this.userService.currentUserSubject.next(Object.assign({}, this.user));
      this.userService.isLoadingSubject.next(false);
    }, 2000);
  }

  cancel() {
    this.user = Object.assign({}, this.firstUserState);
    this.loadForm();
  }
}
