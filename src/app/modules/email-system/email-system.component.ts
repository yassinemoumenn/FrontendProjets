import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageComponent } from './new-message/new-message.component';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-email-system',
  templateUrl: './email-system.component.html',
  styleUrls: ['./email-system.component.scss']
})
export class EmailSystemComponent implements OnInit {
  choosedComponent: number = 0;

  constructor(private auth: AuthenticationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // localStorage.setItem('id', JSON.stringify(this.auth.currentUserValue!.id));
  }

  showComponent(choosed: number) {
    this.choosedComponent = choosed;
  }
  NewMessageDialog() {
    const dialogRef = this.dialog.open(NewMessageComponent, {
      height: '582px',
      width: '600px',
      maxWidth: '600px',
      hasBackdrop: false,
      panelClass: 'mat-dialog-container-wrapper',
      position: {
        bottom: '2em',
        right: '2em'
      }
    });
  }
}
