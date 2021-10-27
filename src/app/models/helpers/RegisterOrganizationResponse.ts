import { AdminModel } from './../../modules/Organization/models/Admin.model';
import { Organization } from '../../models/Organization';

export class RegisterOrganizationResponse {
  organization: Organization;
  admin: AdminModel;

  constructor(request: RegisterOrganizationResponse) {
    this.organization = request.organization;
    this.admin = request.admin;
  }
}
