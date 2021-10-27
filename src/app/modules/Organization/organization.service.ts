import { IssuerOrganization } from './models/IssuerOrganization';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseObject } from '../../models/helpers/ResponseObject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { IssuerModel } from '../issuer/Issuer.model';
import { RecipientModel } from '../recipient/Recipient.model';
import { SignerModel } from '../signer/Signer.model';
import { GroupModel, Organization } from '../../models/Organization';
import { User } from 'src/app/models/User';
import { CategoryModel } from '../issuer/category/Category.model';

const API_ORGANIZATION_URL = `${environment.apiUrl}/organization`;
const API_ISSSUER_ORGANIZATION = `${environment.apiUrl}/IssuerOrganization`;
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  ImpersonateToken = new BehaviorSubject(null);

  /******************************************  Issuer Organization ******************************************/

  /******************************************   Manage users ******************************************/

  getAllUsers(): Observable<ResponseObject<User[]>> {
    return this.http.get<ResponseObject<User[]>>(
      `${API_ISSSUER_ORGANIZATION}/users`
    );
  }

  changeAccountState(userID: string) {
    return this.http.put<ResponseObject<User[]>>(
      `${API_ISSSUER_ORGANIZATION}/changeAccountState/${userID}`,
      ''
    );
  }

  InviteUser(groupID: string, invites) {
    let userIDs: string[] = invites.userIDs;
    let categories: string[] = invites.categories || [];
    return this.http.put(`${API_ISSSUER_ORGANIZATION}/invite/${groupID}`, {
      categories: categories,
      userIDs: userIDs
    });
  }

  ImpersonateUser(Id): Observable<ResponseObject<string>> {
    return this.http.post<ResponseObject<string>>(
      `${API_ISSSUER_ORGANIZATION}/impersonate/${Id}`,
      {}
    );
  }

  ReturnToOriginalUser(Impersonator: string) {
    const headers = new HttpHeaders().set('Impersonator', Impersonator);
    return this.http.get(`${API_ISSSUER_ORGANIZATION}/cancelImpersonate`, {
      headers: headers
    });
  }

  getAllNonAffectedIssuers(): Observable<ResponseObject<IssuerModel[]>> {
    return this.http.get<ResponseObject<IssuerModel[]>>(
      `${API_ISSSUER_ORGANIZATION}/NonAffectedIssuers`
    );
  }

  getUsersNotInOrganization(): Observable<ResponseObject<User[]>> {
    return this.http.get<ResponseObject<User[]>>(
      `${API_ISSSUER_ORGANIZATION}/newUsers`
    );
  }

  /******************************************    Manage signers  ******************************************/

  AddSigner(
    groups: string[],
    signer: SignerModel
  ): Observable<ResponseObject<SignerModel>> {
    return this.http.post<ResponseObject<SignerModel>>(
      `${API_ISSSUER_ORGANIZATION}/signers`,
      {
        signer: signer,
        groups: groups
      }
    );
  }

  UpdateSigner(
    idSigner: string,
    signer: SignerModel
  ): Observable<ResponseObject<SignerModel>> {
    return this.http.put<ResponseObject<SignerModel>>(
      `${API_ISSSUER_ORGANIZATION}/signers/${idSigner}`,
      signer
    );
  }

  DeleteSigner(idSigner: string) {
    return this.http.delete(`${API_ISSSUER_ORGANIZATION}/signers/${idSigner}`);
  }

  /****************************************** Manage issuers ******************************************/

  AddIssuer(
    groupID: string,
    issuer: IssuerModel
  ): Observable<ResponseObject<IssuerModel>> {
    return this.http.post<ResponseObject<IssuerModel>>(
      `${API_ISSSUER_ORGANIZATION}/issuers/${groupID}`,
      issuer
    );
  }

  UpdateIssuer(
    idIssuer: string,
    issuer: IssuerModel
  ): Observable<ResponseObject<IssuerModel>> {
    return this.http.put<ResponseObject<IssuerModel>>(
      `${API_ISSSUER_ORGANIZATION}/issuers/${idIssuer}`,
      issuer
    );
  }

  DeleteIssuer(userId: string) {
    return this.http.delete(`${API_ISSSUER_ORGANIZATION}/issuers/${userId}`);
  }

  /****************************************** recipients ******************************************/

  AddRecipient(
    groups: string[],
    recipient: RecipientModel
  ): Observable<ResponseObject<RecipientModel>> {
    return this.http.post<ResponseObject<RecipientModel>>(
      `${API_ISSSUER_ORGANIZATION}/recipients`,
      {
        recipient: recipient,
        groups: groups
      }
    );
  }

  UpdateRecipient(
    idRecipient: string,
    recipient: RecipientModel
  ): Observable<ResponseObject<RecipientModel>> {
    return this.http.put<ResponseObject<RecipientModel>>(
      `${API_ISSSUER_ORGANIZATION}/recipients/${idRecipient}`,
      recipient
    );
  }

  DeleteRecipient(idRecipient: string) {
    return this.http.delete(
      `${API_ISSSUER_ORGANIZATION}/recipients/${idRecipient}`
    );
  }

  /****************************************** Manage Groups ******************************************/

  getAllGroups(): Observable<ResponseObject<GroupModel[]>> {
    return this.http.get<ResponseObject<GroupModel[]>>(
      `${API_ISSSUER_ORGANIZATION}/groups`
    );
  }
  getOrganization(): Observable<ResponseObject<Organization>> {
    return this.http.get<ResponseObject<Organization>>(
      `${API_ORGANIZATION_URL}/admin/currentOrganization`
    );
  }

  createGroup(
    organizationGroup: GroupModel
  ): Observable<ResponseObject<GroupModel>> {
    return this.http.post<ResponseObject<GroupModel>>(
      `${API_ISSSUER_ORGANIZATION}/createGroup`,
      organizationGroup
    );
  }

  updateOrganizationGroup(groupID: string, organizationGroup: GroupModel) {
    return this.http.put<ResponseObject<GroupModel>>(
      `${API_ISSSUER_ORGANIZATION}/updateGroup/${groupID}`,
      organizationGroup
    );
  }

  deleteOrganizationGroup(groupID: string) {
    return this.http.delete(
      `${API_ISSSUER_ORGANIZATION}/deleteGroup/${groupID}`
    );
  }

  affectUserToGroup(userID: string, groupIDs: string[]) {
    return this.http.put(
      `${API_ISSSUER_ORGANIZATION}/affect/${userID}`,
      groupIDs
    );
  }

  /****************************************** Manage Credits ******************************************/

  sendCreditToGroup(
    groupID: string,
    credits: number
  ): Observable<ResponseObject<IssuerOrganization>> {
    return this.http.put<ResponseObject<IssuerOrganization>>(
      `${API_ISSSUER_ORGANIZATION}/updateCredits/${groupID}`,
      {
        credits: credits
      }
    );
  }

  purchasePack(packID: string): Observable<ResponseObject<IssuerOrganization>> {
    return this.http.put<ResponseObject<IssuerOrganization>>(
      `${API_ISSSUER_ORGANIZATION}/purchasePack/${packID}`,
      null
    );
  }

  /****************************************** Categories ******************************************/

  AllCategoriesByGroup(
    id: string
  ): Observable<ResponseObject<CategoryModel[]>> {
    return this.http.get<ResponseObject<CategoryModel[]>>(
      `${API_ISSSUER_ORGANIZATION}/categories/${id}`
    );
  }

  /****************************************** Issuers Requests ******************************************/

  getAllIssuerRequests(): Observable<ResponseObject<IssuerModel[]>> {
    return this.http.get<ResponseObject<IssuerModel[]>>(
      `${API_ISSSUER_ORGANIZATION}/issuerRequests`
    );
  }

  AcceptIssuerRequest(id: string): Observable<ResponseObject<IssuerModel>> {
    return this.http.put<ResponseObject<IssuerModel>>(
      `${API_ISSSUER_ORGANIZATION}/issuerRequests/${id}/accept`,
      null
    );
  }

  RefuseIssuerRequests(
    id: string,
    idGrp: string
  ): Observable<ResponseObject<IssuerModel>> {
    return this.http.put<ResponseObject<IssuerModel>>(
      `${API_ISSSUER_ORGANIZATION}/issuerRequests/${id}/refuse`,
      null
    );
  }

  /****************************************** Organization ******************************************/

  createOrganizationGroup(
    organizationId: string,
    organizationGroup: GroupModel
  ): Observable<ResponseObject<GroupModel>> {
    return this.http.post<ResponseObject<GroupModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}/createGroup`,
      organizationGroup
    );
  }
  removeOrganizationGroup(
    organizationId: string,
    groupId: string
  ): Observable<ResponseObject<void>> {
    return this.http.delete<ResponseObject<void>>(
      `${API_ORGANIZATION_URL}/${organizationId}/removeGroup/${groupId}`
    );
  }

  addIssuerToOrganizationGroup(
    organizationId: string,
    groupId: string,
    issuerId: string
  ): Observable<ResponseObject<IssuerModel>> {
    return this.http.post<ResponseObject<IssuerModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}/group/${groupId}/addIssuer/${issuerId}`,
      {}
    );
  }
  removeIssuerFromOrganizationGroup(
    organizationId: string,
    groupId: string,
    issuerId: string
  ): Observable<ResponseObject<IssuerModel>> {
    return this.http.delete<ResponseObject<IssuerModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}/group/${groupId}/removeIssuer/${issuerId}`
    );
  }

  addSignerToOrganizationGroup(
    organizationId: string,
    groupId: string,
    signerId: string
  ): Observable<ResponseObject<SignerModel>> {
    return this.http.post<ResponseObject<SignerModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}/group/${groupId}/addSigner/${signerId}`,
      {}
    );
  }
  removeSignerFromOrganizationGroup(
    organizationId: string,
    groupId: string,
    signerId: string
  ): Observable<ResponseObject<SignerModel>> {
    return this.http.delete<ResponseObject<SignerModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}'/group/'${groupId}'/removeSigner/'${signerId}`
    );
  }

  addRecipientToOrganizationGroup(
    organizationId: string,
    groupId: string,
    recipientId: string
  ): Observable<ResponseObject<RecipientModel>> {
    return this.http.post<ResponseObject<RecipientModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}/group/${groupId}/addRecipient/${recipientId}`,
      {}
    );
  }
  removeRecipientFromOrganizationGroup(
    organizationId: string,
    groupId: string,
    recipientId: string
  ): Observable<ResponseObject<RecipientModel>> {
    return this.http.delete<ResponseObject<RecipientModel>>(
      `${API_ORGANIZATION_URL}/${organizationId}'/group/'${groupId}'/removeRecipient/'${recipientId}`
    );
  }
}
