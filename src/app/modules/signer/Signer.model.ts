import { User } from 'src/app/models/User';

export class SignerModel extends User {
  signature?: string;

  constructor(signer: SignerModel) {
    super(signer);
    this.signature = signer.signature;
  }
}
