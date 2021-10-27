import { User } from 'src/app/models/User';
export class IssuerModel extends User {
  signature?: String;

  constructor(issuer: IssuerModel) {
    super(issuer);
    this.signature = issuer.signature;
  }
}
