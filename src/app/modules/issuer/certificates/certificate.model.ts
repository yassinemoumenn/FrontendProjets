import { Field } from '../../../models/Field';
import { ICategoryFields } from '../category/Category.model';
import { IDesignpage } from '../Designs/Design.model';

export enum CertificateStatus {
  CREATED = 'CREATED',
  EXPIRED = 'EXPIRED',
  ISSUED = 'ISSUED',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED',
  REVOKED = 'REVOKED'
}
export interface ICertificateSigners {
  signers?: string[];
  counter?: number;
  isSigned: boolean;
}

export interface ICertificateState {
  createdAt: Date;
  expiredAt?: Date;
  issuedAt?: Date;
  signedAt?: Date;
  rejectedAt?: Date;
  revokedAt?: Date;
  status: CertificateStatus;
  reason?: string;
}

export interface IReceipt {
  txHash: string;
  block: Number;
  timestamp: Date;
}
export interface customIDField {
  field?: Field;
  length?: number;
  day?: boolean;
  month?: boolean;
  year?: boolean;
}
export interface ITransaction {
  publicNetwork?: IReceipt;
  privateNetwork?: IReceipt;
}
export class certificateModel {
  id?: string;
  certificateID?: string;
  qrcode?: string;
  category: {
    id: string;
    name?: string;
    fields?: ICategoryFields;
    signers?: string[];
    verifiers?: string[];
    customID?: customIDField[];
  };
  issuer: string;
  recipient: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    picture: string;
  };
  signers?: string[];
  design: {
    id: string;
    name: string;
    category?: string;
    author?: string;
    recto: IDesignpage;
    verso: IDesignpage;
  };
  state: ICertificateState;
  transaction?: ITransaction;
  affiliation?: {
    groupId?: string;
    groupName?: string;
    organizationName?: string;
  };

  constructor(certificate: certificateModel) {
    this.id = certificate.id;
    this.certificateID = certificate.certificateID;
    this.qrcode = certificate.qrcode;
    this.category = certificate.category;
    this.issuer = certificate.issuer;
    this.recipient = certificate.recipient;
    this.signers = certificate.signers;
    this.design = certificate.design;
    this.state = certificate.state;
    this.affiliation = certificate.affiliation;
  }
}
