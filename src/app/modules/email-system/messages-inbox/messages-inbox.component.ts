import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { EmailSystemService } from '../email-system.service';
import { MailModel } from '../Mail.model';

@Component({
  selector: 'app-messages-inbox',
  templateUrl: './messages-inbox.component.html',
  styleUrls: ['../all-messages/all-messages.component.scss']
})
export class MessagesInboxComponent implements OnInit {
  messages: MailModel[] = [];
  isLoading: boolean = false;

  constructor(private emailSystemService: EmailSystemService) {}

  ngOnInit(): void {
    this.loadInboxMessages();
    this.isLoading = false;
  }

  loadInboxMessages() {
    this.isLoading = true;
    this.emailSystemService
      .getInboxMessages()
      .pipe(
        map((res) => {
          return res.sort((a, b) => {
            let aa = new Date(a.date);
            let bb = new Date(b.date);
            return aa > bb ? -1 : aa < bb ? 1 : 0;
          });
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((messages: MailModel[]) => {
        if (messages.length > 0) {
          this.messages = messages;
        }
      });
  }
}
