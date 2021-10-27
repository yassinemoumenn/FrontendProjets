import { Injectable } from '@angular/core';
import { Feature, Permission, SubUser } from 'src/app/models/Sub-user.model';
import { Role, User } from 'src/app/models/User';
import { IssuerModel } from 'src/app/modules/issuer/Issuer.model';
import { AdminModel } from 'src/app/modules/Organization/models/Admin.model';
import { RecipientModel } from 'src/app/modules/recipient/Recipient.model';
import { SignerModel } from 'src/app/modules/signer/Signer.model';
import { VerifierModel } from 'src/app/modules/verifier/Verifier.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  /**
   * Method checks if the sub-user is able to access a set of features in our app
   * @param user sub-user
   * @param feature `enum` containing all features
   * @param permission `enum` containing all permissions
   * @returns  `boolean` whether this sub-user is allowed or not
   */
  hasPermission(
    user: SubUser,
    feature: Feature,
    permission: Permission
  ): boolean {
    const featurePermission = user.delegation?.Permissions.find(
      (f) => f.feature === feature
    );

    if (!!featurePermission) {
      switch (permission) {
        case Permission.READ:
          return featurePermission.permission === Permission.READ;
        case Permission.WRITE:
          return featurePermission.permission === Permission.WRITE;
        case Permission.ADMIN:
          return featurePermission.permission === Permission.ADMIN;
        default:
          return featurePermission.permission === Permission.NONE; // maybe return false here
      }
    }
    return false;
  }

  getUserInstance(
    user: any
  ):
    | SubUser
    | AdminModel
    | IssuerModel
    | SignerModel
    | RecipientModel
    | VerifierModel {
    if (user.hasOwnProperty('delegation')) return new SubUser(user);

    switch (user.role) {
      case Role.ISSUER:
        return new IssuerModel(user);
      case Role.SIGNER:
        return new SignerModel(user);
      case Role.RECIPIENT:
        return new RecipientModel(user);
      case Role.VERIFIER:
        return new VerifierModel(user);
      default:
        return user as User;
    }
  }
}
