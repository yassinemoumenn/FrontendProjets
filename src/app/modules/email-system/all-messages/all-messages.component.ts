import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { EmailSystemService } from '../email-system.service';
import { MailModel } from '../Mail.model';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.scss']
})
export class AllMessagesComponent implements OnInit {
  messages: MailModel[] = [];
  isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private emailSystemService: EmailSystemService) {}

  ngOnInit(): void {
    this.loadAllMessages();
    this.isLoading = false;
  }

  loadAllMessages() {
    this.isLoading = true;
    const All = this.emailSystemService
      .getAllMessages()
      .pipe(
        map(
          (res) => {
            return res.sort((a, b) => {
              let aa = new Date(a.date);
              let bb = new Date(b.date);
              return aa > bb ? -1 : aa < bb ? 1 : 0;
            });
          },
          finalize(() => {
            this.isLoading = false;
          })
        )
      )
      .subscribe((messages: MailModel[]) => {
        if (messages.length > 0) {
          this.messages = messages;
        }
      });
    this.subscriptions.push(All);
  }
}
