import { Field } from 'src/app/models/Field';
import { GroupModel } from 'src/app/models/Organization';

export enum IdGenerationType {
  AUTOMATIC = 'AUTOMATIC',
  CUSTOM = 'CUSTOM',
  FIELD = 'FIELD'
}

export enum Source {
  ISSUER = 'ISSUER',
  ORGANIZATION = 'ORGANIZATION',
  RECIPIENT = 'RECIPIENT',
  CERTIFICATE = 'CERTIFICATE',
  ISSUEDATE = 'ISSUEDATE'
}
export interface ICategoryFields {
  recipient: Field[];
  certificate: Field[];
}
export interface customIDField {
  field?: Field;
  length?: number;
  day?: boolean;
  month?: boolean;
  year?: boolean;
  source?: Source;
}

export class CategoryModel {
  id?: string;
  name: String;
  issuer: String;
  idGenerationType: IdGenerationType;
  fields!: ICategoryFields;
  signers?: String[];
  verifiers?: String[];
  group: GroupModel; // group id
  isActive?: boolean; // category state for each recipient
  customID?: customIDField[];

  constructor(category: CategoryModel) {
    this.id = category.id;
    this.name = category.name;
    this.issuer = category.issuer;
    this.idGenerationType =
      category.idGenerationType || IdGenerationType.AUTOMATIC;
    this.fields = category.fields;
    this.signers = category.signers;
    this.verifiers = category.verifiers;
    this.group = category.group;
    this.isActive = category.isActive;
  }
}
