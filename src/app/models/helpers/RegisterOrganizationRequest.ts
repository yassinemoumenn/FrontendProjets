import { AdminModel } from './../../modules/Organization/models/Admin.model';
import { Organization } from '../../models/Organization';

export class RegisterOrganizationRequest {
  organization: Organization;
  admin: AdminModel;

  constructor(request: RegisterOrganizationRequest) {
    this.organization = request.organization;
    this.admin = request.admin;
  }
}
