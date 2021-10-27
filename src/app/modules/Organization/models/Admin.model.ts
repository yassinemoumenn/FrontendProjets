import { User } from 'src/app/models/User';
export interface IPurchaseHistory {
  timestamp: string;
  pack: string; // pack id
}

export interface IWallet {
  isActive?: boolean;
  credits?: number;
  history: IPurchaseHistory[];
}

export class AdminModel extends User {
  organization: string;

  constructor(admin: AdminModel) {
    super(admin);
    this.organization = admin.organization;
  }
}
