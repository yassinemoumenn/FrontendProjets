import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { ContactModel } from './Contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../index2/style-landing-page.scss']
})

/**
 * Contact-component
 */
export class ContactComponent {
  contact!: ContactModel;

  constructor(
    private homeService: HomeService,
    private notification: SnackbarService
  ) {}

  Contactform = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });
  isLoading: boolean = false;
  sendMessage() {
    this.isLoading = true;
    const contactData = this.Contactform.value;

    this.homeService.sendContactform(contactData).subscribe(
      (res: any) => {
        this.notification.push({
          message: res.message,
          type: 'success'
        });
        this.Contactform.setValue({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      },
      (err) => {
        this.notification.push({
          message: err.message,
          type: 'error'
        });
      }
    );
    this.isLoading = false;
  }
}
