import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignerRoutingModule } from './signer-routing.module';
import { CertificateComponent } from './certificate/certificate.component';
import { ViewCertificatesComponent } from './certificate/view-certificates/view-certificates.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignerComponent } from './signer.component';
import { RejectCertificateComponent } from './certificate/reject-certificate/reject-certificate.component';

@NgModule({
  declarations: [
    SignerComponent,
    CertificateComponent,
    ViewCertificatesComponent,
    RejectCertificateComponent
  ],
  imports: [CommonModule, SignerRoutingModule, SharedModule]
})
export class SignerModule {}
