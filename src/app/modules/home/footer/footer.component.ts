import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-footer-home',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../index2/style-landing-page.scss']
})
/**
 * Footer component
 */
export class FooterComponent {
  cur_year = new Date().getFullYear();

  constructor(
    private homeService: HomeService,
    private notification: SnackbarService
  ) {}

  Subscribeform = new FormGroup({
    email: new FormControl('', Validators.required)
  });
  subscribeTonewsLetter() {
    const subscription = this.Subscribeform.get('email')?.value;

    this.homeService.subscribeTonewsLetter(subscription).subscribe(
      (res: any) => {
        this.notification.push({
          message: res.message,
          type: 'success'
        });
        this.Subscribeform.setValue({ email: '' });
      },
      (error) => {
        this.notification.push({
          message: 'please provide a valid email',
          type: 'warning'
        });
      }
    );
  }
}
