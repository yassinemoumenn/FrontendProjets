import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailSystemComponent } from './email-system.component';
import { RouterModule, Routes } from '@angular/router';
import { NewMessageComponent } from './new-message/new-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllMessagesComponent } from './all-messages/all-messages.component';
import { MessagesInboxComponent } from './messages-inbox/messages-inbox.component';
import { MessagesSentComponent } from './messages-sent/messages-sent.component';
import { MessageElementComponent } from './message-element/message-element.component';


const routes: Routes = [
  { path: '', component: EmailSystemComponent }
];

export const routing = RouterModule.forChild(routes)

@NgModule({
  declarations: [EmailSystemComponent, NewMessageComponent, AllMessagesComponent, MessagesInboxComponent, MessagesSentComponent, MessageElementComponent],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class EmailSystemModule { }
