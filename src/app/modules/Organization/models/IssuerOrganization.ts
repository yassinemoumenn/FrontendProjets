import { Identity } from 'src/app/core/helpers/Identity';
import { Organization } from '../../../models/Organization';

export interface IPurchaseHistory {
  timestamp: Date;
  pack: string;
}

export class PackModel {
  id?: string;
  title: string;
  label: string;
  description: string;
  storage: number;
  discount: number;
  image: string;
  expireIn: Date;
  numberOfCertificates: number;
  issuanceFee: number;
  customVerificationPage: boolean;
  recipients: number;
  signers: number;
  categories: number;

  constructor(pack: PackModel) {
    this.id = pack.id;
    this.title = pack.title;
    this.label = pack.label;
    this.description = pack.description || '';
    this.storage = pack.storage;
    this.discount = pack.discount || 0;
    this.image = pack.image || '';
    this.expireIn = pack.expireIn;
    this.numberOfCertificates = pack.numberOfCertificates;
    this.issuanceFee = pack.issuanceFee;
    this.customVerificationPage = pack.customVerificationPage;
    this.recipients = pack.recipients;
    this.signers = pack.signers;
    this.categories = pack.categories;
  }
}

export interface IBlockchain {
  publicIdentity: Identity; // public identity
  privateIdentity: Identity; // private identity
}
export interface IWallet {
  identity: IBlockchain;
}

export class IssuerOrganization extends Organization {
  wallet: IWallet;
  organizationGroups: string[];
  pack?: PackModel;
  purchaseHistory?: IPurchaseHistory[];
  areaCode?: String;
  institutionId?: String;
  constructor(organization: IssuerOrganization) {
    super(organization);
    this.wallet = organization.wallet;
    this.organizationGroups = organization.organizationGroups;
    this.pack = organization.pack;
    this.purchaseHistory = organization.purchaseHistory;
  }
}
