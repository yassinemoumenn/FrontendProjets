export class MailModel {
  id?: string;
  title: string;
  sender: string;
  receiver: string;
  body?: string;
  date: Date;

  constructor(mail: MailModel) {
    this.id = mail.id;
    this.title = mail.title;
    this.sender = mail.sender;
    this.receiver = mail.receiver;
    this.body = mail.body || '';
    this.date = new Date();
  }
}
