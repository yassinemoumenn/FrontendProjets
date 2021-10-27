import { User } from 'src/app/models/User';

export interface IVerificationHistory {
  certificate: String;
  timestamp: Date;
}

export class VerifierModel extends User {
  history?: IVerificationHistory[];

  constructor(verifier: VerifierModel) {
    super(verifier);
    this.history = verifier.history;
  }
}
