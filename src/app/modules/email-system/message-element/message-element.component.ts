import { Component, Input, OnInit } from '@angular/core';
import { MailModel } from '../Mail.model';

@Component({
  selector: 'app-message-element',
  templateUrl: './message-element.component.html',
  styleUrls: ['./message-element.component.scss']
})
export class MessageElementComponent implements OnInit {
  currentuser = localStorage.getItem('id');
  @Input() message!: MailModel;
  receiver: any;
  sender: any;
  currentUserIsSender?: boolean;

  constructor() {}

  ngOnInit(): void {
    switch (this.currentuser) {
      case this.message.sender:
        this.currentUserIsSender = true;
        this.receiver = this.message.receiver;
        break;

      case this.message.receiver:
        this.currentUserIsSender = false;
        this.sender = this.message.sender;
        break;

      default:
        break;
    }
  }
}
