import { User } from 'src/app/models/User';
import { CategoryModel } from '../issuer/category/Category.model';
export enum AccountState {
  ACTIVATED = 'ACTIVATED',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED'
}
export interface AffiliationDetails {
  id: String;
  name: String;
}
export interface AffiliationRecipient {
  organization: AffiliationDetails;
  isActive: boolean;
  accountState: AccountState;
  date?: Date;
}
export interface CategoryRequest {
  category: CategoryModel;
  date?: Date;
}
export class RecipientModel extends User {
  categories: CategoryModel[];
  recipientOrganizations?: AffiliationRecipient[]; //[];
  categoryInvitations?: CategoryModel[];
  categoryRequests?: CategoryRequest[];
  constructor(recipient: RecipientModel) {
    super(recipient);
    this.categories = recipient.categories;
    this.recipientOrganizations = recipient.recipientOrganizations;
  }
}
