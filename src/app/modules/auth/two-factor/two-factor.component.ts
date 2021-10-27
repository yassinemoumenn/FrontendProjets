import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {
  phoneSubStr?: string;
  email?: string;
  phone?: string;
  fb: FormBuilder = new FormBuilder();
  twoFactorForm: FormGroup = new FormGroup({});
  switchEmailForm: FormGroup = new FormGroup({});
  isInAccountInfo: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    @Optional()
    public dialogSmsRef: MatDialogRef<TwoFactorComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: {
      phone: string | undefined;
      email: string | undefined;
      dialog: MatDialog;
    }
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/user-profile/account-information') {
      this.isInAccountInfo = true;
      this.phoneSubStr = this.data.phone?.substring(this.data.phone.length - 4);
      this.email = this.data.email;
      this.phone = this.data.phone;
    } else {
      this.isInAccountInfo = false;
      this.phoneSubStr = this.authService.phone.substring(
        this.authService.phone.length - 4
      );
      this.email = this.authService.getEmail;
      this.phone = this.authService.phone;
    }

    this.initForm();
  }
  initForm() {
    this.twoFactorForm = this.fb.group({
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
      code5: ['', Validators.required],
      code6: ['', Validators.required]
    });
    this.switchEmailForm = this.fb.group({
      email: [this.email, Validators.required]
    });
  }
  verifyCode() {
    const verificationCode =
      this.twoFactorForm.value.code1 +
      this.twoFactorForm.value.code2 +
      this.twoFactorForm.value.code3 +
      this.twoFactorForm.value.code4 +
      this.twoFactorForm.value.code5 +
      this.twoFactorForm.value.code6;
    this.authService
      .verifyCodeSms(this.authService.getPhone, verificationCode)
      .subscribe(
        (data) => {
          let userName = this.authService.getUsername;
          let password = this.authService.getPassword;

          this.authService.login(userName, password).subscribe(
            () => {
              this.snackbarService.push({
                message: 'Code verified',
                type: 'success'
              });
              this.router.navigate(['/dashboard']);
            },
            (err) => {
              this.snackbarService.push({
                message: err.error.message,
                type: 'error'
              });
            }
          );
        },
        (err) => {
          this.snackbarService.push({
            message: err.error.message,
            type: 'error'
          });
        }
      );
  }
  ResendCodeVerification() {
    this.twoFactorForm.reset();
    this.authService.SendCodeSms(this.phone ?? '', 'en').subscribe((data) => {
      this.emailSent = false;
      this.snackbarService.push({
        message: 'verification code sent successfully',
        type: 'success'
      });
    });
  }
  verifyCodeAccountInfo() {
    const verificationCode =
      this.twoFactorForm.value.code1 +
      this.twoFactorForm.value.code2 +
      this.twoFactorForm.value.code3 +
      this.twoFactorForm.value.code4 +
      this.twoFactorForm.value.code5 +
      this.twoFactorForm.value.code6;
    if (this.data.phone)
      this.authService
        .verifyCodeSms(this.data.phone, verificationCode)
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: 'Code verified',
              type: 'success'
            });
            this.dialogSmsRef.close({ success: true, data: 'Code verified' });
          },
          (err) => {
            this.snackbarService.push({
              message: err.error.message,
              type: 'error'
            });
            this.dialogSmsRef.close({ success: false, data: err.message });
          }
        );
  }
  emailSent: boolean = false;
  sendCodeVerificationEmail() {
    if (this.switchEmailForm.valid)
      this.authService
        .SendCodeEmail(this.switchEmailForm.value.email)
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: 'verification code sent successfully',
              type: 'success'
            });
            this.emailSent = true;
            this.dialogEmailRef.close({ success: true, data: 'Code verified' });
          },
          (err) => {
            this.emailSent = false;
            this.snackbarService.push({
              message: err.message,
              type: 'error'
            });
            this.dialogEmailRef.close({ success: false, data: err.message });
          }
        );
    else
      this.snackbarService.push({
        message: 'Enter a valid email',
        type: 'warning'
      });
  }
  verifyCodeEmail() {
    const verificationCode =
      this.twoFactorForm.value.code1 +
      this.twoFactorForm.value.code2 +
      this.twoFactorForm.value.code3 +
      this.twoFactorForm.value.code4 +
      this.twoFactorForm.value.code5 +
      this.twoFactorForm.value.code6;
    this.authService
      .verifyCodeEmail(this.switchEmailForm.value.email, verificationCode)
      .subscribe(
        (data) => {
          this.snackbarService.push({
            message: 'Code verified',
            type: 'success'
          });
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.snackbarService.push({
            message: err.error.message,
            type: 'error'
          });
        }
      );
  }

  verifyCodeEmailAccountInfo() {
    const verificationCode =
      this.twoFactorForm.value.code1 +
      this.twoFactorForm.value.code2 +
      this.twoFactorForm.value.code3 +
      this.twoFactorForm.value.code4 +
      this.twoFactorForm.value.code5 +
      this.twoFactorForm.value.code6;
    if (this.emailSent)
      this.authService
        .verifyCodeEmail(this.switchEmailForm.value.email, verificationCode)
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: 'Code verified',
              type: 'success'
            });
            this.dialogSmsRef.close({ success: true, data: 'Code verified' });
          },
          (err) => {
            this.snackbarService.push({
              message: err.message,
              type: 'error'
            });
            this.dialogSmsRef.close({ success: false, data: err.message });
          }
        );
    else
      this.snackbarService.push({
        message: 'Send the code first',
        type: 'warning'
      });
  }

  dialogEmailRef!: any;
  isEmailVerification: boolean = false;
  openSwitchEmail(content) {
    this.initForm();
    this.dialogEmailRef = this.dialog.open(content, {
      width: '40%'
    });
    this.dialogEmailRef.afterClosed().subscribe((data) => {
      this.isEmailVerification = true;
    });
  }

  onDigitInput(event) {
    let element;
    if (event.code !== 'Backspace' && event.code !== 'Space')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element !== null) element.focus();
    else {
      if (this.twoFactorForm.valid)
        if (this.isEmailVerification) {
          if (this.isInAccountInfo) this.verifyCodeEmailAccountInfo();
          else this.verifyCodeEmail();
        } else {
          if (this.isInAccountInfo) this.verifyCodeAccountInfo();
          else this.verifyCode();
        }
    }
  }

  DismissEmail(e) {
    this.dialogEmailRef.close();
  }

  Dismiss(e) {
    if (e) this.data.dialog.closeAll();
  }
}
