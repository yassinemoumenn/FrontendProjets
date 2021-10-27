export enum Role {
  ISSUER = 'ISSUER',
  SIGNER = 'SIGNER',
  VERIFIER = 'VERIFIER',
  RECIPIENT = 'RECIPIENT',
  ADMIN = 'ADMIN'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum ActivityType {
  UPLOAD_CERTIFICATES,
  ACCOUNT_ACTIVATED,
  CERTIFICATE_VALIDATED
}

export enum AccountState {
  ACTIVATED = 'ACTIVATED',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED'
}

export interface INotification {
  sms?: boolean;
  email?: boolean;
  app?: boolean;
}

export interface IPhone {
  areaCodes?: string[];
  dialCode?: string;
  flagClass?: string;
  iso2?: string;
  name?: string;
  placeHolder?: string;
  priority?: number;
  isTrusted?: boolean;
}

export interface IAddress {
  country?: string;
  city?: string;
  postalCode?: number;
}

export interface IActivity {
  activityType: ActivityType;
  timestamp: String;
}

export interface IAccountSettings {
  notification: INotification;
  twoFactorAuthentication: boolean;
  passwordResetVerification: boolean;
}
export interface AffiliationDetails {
  id: string;
  name: string;
}
export interface IAffiliation {
  group: AffiliationDetails;
  organization: AffiliationDetails;
  isActive?: boolean;
  accountState?: AccountState;
  currentOrganization?: boolean;
  date?: Date;
}

export abstract class User {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  email?: string;
  picture?: string;
  birthday: Date;
  role: Role;
  password?: string;
  gender?: Gender;
  phone?: IPhone;
  address: IAddress;
  activities?: IActivity[];
  accountSettings: IAccountSettings;
  
  accountState?: AccountState;
  occupation?: string;
  groups: IAffiliation[];

  constructor(user: User) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.email = user.email;
    this.picture = user.picture
      ? user.picture
      : user.gender === Gender.FEMALE
      ? '../../assets/media/svg/avatars/female.svg'
      : '../../assets/media/svg/avatars/male.svg';

    this.birthday = user.birthday;
    this.password = user.password;
    this.role = user.role;
    this.gender = user.gender;
    this.phone = user.phone;
    this.address = user.address;
    this.activities = user.activities;
    this.accountSettings = user.accountSettings;
    this.occupation = user.occupation;
    this.groups = user.groups;
    this.accountState = user.accountState;
  }
}
