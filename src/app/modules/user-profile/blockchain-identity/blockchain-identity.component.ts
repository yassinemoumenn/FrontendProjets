import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../auth/authentication.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { SnackbarModel } from 'src/app/shared/components/snackbar/snackbar.model';
import { UserProfileService } from '../user-profile.service';
import { Identity } from 'src/app/core/helpers/Identity';
import { IssuerOrganization } from '../../Organization/models/IssuerOrganization';
@Component({
  selector: 'app-blockchain-identity',
  templateUrl: './blockchain-identity.component.html',
  styleUrls: ['./blockchain-identity.component.scss']
})
export class BlockchainIdentityComponent implements OnInit {
  isLoading$: Observable<boolean>;
  showHoverPri: boolean = false;
  showHoverPub: boolean = false;

  isLoadingPublic: boolean = false;
  isLoadingPrivate: boolean = false;

  isPrivate: boolean = true;
  isPublic: boolean = false;

  organization!: IssuerOrganization;

  publicBlockchain?: Identity;
  constructor(
    private authService: AuthenticationService,
    private _snackbarService: SnackbarService,
    private userProfileService: UserProfileService
  ) {
    this.isLoading$ = this.authService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.organization = this.authService.currentOrganizationValue as IssuerOrganization;

    this.publicBlockchain =
      this.organization?.wallet?.identity?.publicIdentity;
  }

  public get GetPublicKey(): string | undefined {
    return this.publicBlockchain?.publickey;
  }

  public get GetPrivateKey(): string | undefined {
    return this.organization?.wallet?.identity?.privateIdentity.privatekey;
  }

  changeClipboardColorPub($event: Event): void {
    this.showHoverPub = $event.type === 'mouseover' ? true : false;
  }

  changeClipboardColorPri($event: Event): void {
    this.showHoverPri = $event.type === 'mouseover' ? true : false;
  }

  /* To copy Text from Input */
  copyInputMessage(inputElement) {
    if (this.GetPrivateKey || this.GetPublicKey) {
      const message: SnackbarModel = {
        message: 'USER_PROFILE.BLOCKCHAIN_IDENTITY.BODY.PRIVATE.msgCopier',
        type: 'success'
      };
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
      this._snackbarService.push(message);
    }
  }

  PublicKey() {
    this.isPublic = true;
    this.isPrivate = false;
  }

  PrivateKey() {
    this.isPublic = false;
    this.isPrivate = true;
  }

  GeneratePublicKey() {
    this.isLoadingPublic = true;
    this.userProfileService.generateBlockChainPublicKey().subscribe(
      (data) => {
        if (this.organization) {
          this.organization.wallet = {
            identity: {
              publicIdentity: {
                publickey: data.identity.publickey,
                privatekey: data.identity.privatekey
              },
              privateIdentity: {
                publickey: this.organization.wallet?.identity?.privateIdentity.publickey,
                privatekey: this.organization.wallet?.identity?.privateIdentity.privatekey
              }
            },
          };

          this.userProfileService
            .updateOrganization(this.organization)
            .subscribe(
              (data) => {
                if (data.success) {
                  this.isLoadingPublic = false;
                  this.publicBlockchain =
                    (data.data as IssuerOrganization).wallet.identity.publicIdentity;
                  this._snackbarService.push({
                    message:
                      'USER_PROFILE.BLOCKCHAIN_IDENTITY.BODY.PUBLIC.msgGeneratedSuccessfully',
                    type: 'success'
                  });
                }
              },
              (err) => {
                this.isLoadingPublic = false;
                this._snackbarService.push({
                  message:
                    'Blockchain public key generation call in error : ' +
                    err.message,
                  type: 'error'
                });
              }
            );
        }
      },
      (err) => {
        this.isLoadingPublic = false;
        this._snackbarService.push({
          message:
            'Blockchain public key generation call in error : ' + err.message,
          type: 'error'
        });
      }
    );
  }

  msg: string = '';

  GeneratePrivateKey() {
    this.isLoadingPrivate = true;
    this.userProfileService
      .generateBlockchainPrivateIdentity(this.organization.name)
      .subscribe(
        (identityData) => {
          this.organization.wallet = {
            identity: {
              publicIdentity:
                this.organization.wallet?.identity?.publicIdentity,
              privateIdentity: {
                publickey: "",
                privatekey: identityData.data
              }
            }
          };
          this.userProfileService
            .updateOrganization(this.organization)
            .subscribe(
              (data) => {
                if (data.success) {
                  this.isLoadingPrivate = false;
                  this.authService.currentOrganizationSubject.next(
                    Object.assign({}, this.organization)
                  );
                  this._snackbarService.push({
                    message: identityData.message,
                    type: 'success'
                  });
                }
              },
              (err) => {
                this.isLoadingPrivate = false;
                this._snackbarService.push({
                  message:
                    'Blockchain public key generation call in error : ' +
                    err.message,
                  type: 'error'
                });
              }
            );
        },
        (error) => {
          this.msg = error.error.message;
          this.isLoadingPrivate = false;
          this._snackbarService.push({
            message: error.message,
            type: 'error'
          });
        }
      );
  }
}
