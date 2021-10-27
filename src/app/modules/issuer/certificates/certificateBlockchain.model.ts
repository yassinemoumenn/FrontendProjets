import { Field } from '../../../models/Field';

export enum Network {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  BOTH = 'BOTH'
}
export enum CertificateStatus {
  CREATED = 'CREATED',
  EXPIRED = 'EXPIRED',
  ISSUED = 'ISSUED',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED',
  REVOKED = 'REVOKED'
}

export interface ICertificateState {
  createdAt: Date;
  expiredAt?: Date;
  issuedAt?: Date;
  signedAt?: Date;
  rejectedAt?: Date;
  revokedAt?: Date;
  status: CertificateStatus;
}

export interface IBlockchainCategoryFields {
  recipient?: Field[];
  certificate?: Field[];
}
export class certificateBlockchainModel {
  id?: string;
  certificateID?: string;
  issuer: string;
  recipient?: string;
  signers?: string[];
  state?: ICertificateState;
  fields?: IBlockchainCategoryFields;
  transactionId?: string;
  timestamp?: Date;
  blockNumber?: Number;

  constructor(certificate: certificateBlockchainModel) {
    this.id = certificate.id;
    this.certificateID = certificate.certificateID;
    this.issuer = certificate.issuer;
    this.recipient = certificate.recipient;
    this.signers = certificate.signers;
    this.state = certificate.state;
    this.fields = certificate.fields;
  }
}
