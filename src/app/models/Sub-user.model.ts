import { User } from './User';

export enum Feature {
  CATEGORY,
  CERTIFICATE,
  DESIGN,
  TICKET
}

export enum Permission {
  NONE,
  READ,
  WRITE,
  ADMIN
}

export interface IPermission {
  feature: Feature;
  permission: Permission;
}

export interface IDelegation {
  id: string; // delegated from
  startAt: Date;
  endAt: Date;
  Permissions: IPermission[];
}

export class SubUser extends User {
  delegation?: IDelegation; // delegation delegation
  history: IDelegation[]; // delegation history

  constructor(subuser: SubUser) {
    super(subuser);
    this.delegation = subuser.delegation;
    this.history = subuser.history;
  }
}

/**
 * ----- Workflow -----
 *
 * The subUser is also a user
 * When a subUser logs in the app, check the delegation property to see if it is undefined.
 * delegation === undefined means that the subUser is not being delegated to any task.
 * delegation === defined we need to get the data by the user id that is present in the interface IDelegation.
 * every delegation must be pushed into the history property to keep track of everything in it.
 */
