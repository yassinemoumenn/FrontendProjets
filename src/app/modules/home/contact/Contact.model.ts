export class ContactModel {
  name: string;
  email: string;
  subject: string;
  message: string;
  constructor(contact: ContactModel) {
    this.name = contact.name;
    this.email = contact.email;
    this.subject = contact.subject;
    this.message = contact.message;
  }
}
