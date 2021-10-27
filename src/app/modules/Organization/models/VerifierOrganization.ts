import { Organization } from "src/app/models/Organization";

export class VerifierOrganization extends Organization {

    constructor(organization: VerifierOrganization) {
        super(organization);
    }
}