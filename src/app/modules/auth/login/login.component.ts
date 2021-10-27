import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  hasError?: boolean;
  returnUrl?: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private snackbarService: SnackbarService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {




    
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ]
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f.username.value.trim().toLowerCase(), this.f.password.value)
      .pipe(first())
      .subscribe(
        (user: User) => {
          if (!user) this.hasError = true;
          if (user.accountSettings?.twoFactorAuthentication) {
            this.authService.setPhone = user.phone?.placeHolder ?? '';
            this.authService.setEmail = user.email ?? '';
            this.authService.setUsername = this.f.username.value;
            this.authService.setPassword = this.f.password.value;
            this.authService.logout(true).subscribe(() => {
              this.authService
                .SendCodeSms(this.authService.phone, 'en')
                .subscribe(
                  (data) => {
                    this.snackbarService.push({
                      message: 'verification code sent successfully',
                      type: 'success'
                    });
                    this.router.navigate(['/auth/verification']);
                  },
                  (err) => {
                    this.snackbarService.push({
                      message: err.message,
                      type: 'error'
                    });
                  }
                );
            });
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        (err) => {
          this.hasError = true;
          throw new Error(this.translate.instant('ERROR.CLIENT.CREDENTIALS'));
        }
      );
    this.unsubscribe.push(loginSubscr);
  }

  loginGoogle() {
    this.hasError = false;
    // this.authService.loginGoogle()
  }

  loginLinkedin() {
    this.hasError = false;
    // this.authService.loginLinkedin()
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
