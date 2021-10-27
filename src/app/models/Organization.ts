export enum OrganizationType {
  ISSUERORGANIZATION = "ISSUERORGANIZATION",
  RECIPIENTORGANIZATION = "RECIPIENTORGANIZATION",
  VERIFIERORGANIZATION = "VERIFIERORGANIZATION"
}

export class GroupModel {
  id?: string;
  organization: string;
  name: string;
  description?: string;
  issuer: string;
  signers?: string[];
  recipients?: string[];
  recipientOrganizations?: string[];
  credits: number;

  constructor(group: GroupModel) {
    this.id = group.id;
    this.organization = group.organization;
    this.name = group.name;
    this.description = group.description;
    this.issuer = group.issuer;
    this.signers = group.signers;
    this.recipients = group.recipients;
    this.recipientOrganizations = group.recipientOrganizations;
    this.credits = group.credits;
  }
}

export abstract class Organization {
  id?: string;
  admin: string;
  name: string;
  location?: string; // change to maps
  domain?: string;
  website?: string;
  type?: OrganizationType;
  constructor(organization: Organization) {
    this.id = organization.id;
    this.admin = organization.admin;
    this.name = organization.name;
    this.location = organization.location;
    this.domain = organization.domain;
    this.website = organization.website;
    this.type = organization.type;
  }
}
