import { Organization } from 'src/app/models/Organization';
export interface IAffiliation {
  group: AffiliationDetails;
  organization: AffiliationDetails;
  isActive?: boolean;
  accountState?: AccountState;
  currentOrganization?: boolean;
}
export enum AccountState {
  ACTIVATED,
  PENDING,
  BLOCKED
}
export interface AffiliationDetails {
  id: String;
  name: String;
}
export interface GroupRecipient extends IAffiliation {
  recipients: string[];
  categories: string[];
}
export class RecipientOrganization extends Organization {
  groups?: GroupRecipient[];
  constructor(organization: RecipientOrganization) {
    super(organization);
    this.groups = organization.groups;
  }
}
