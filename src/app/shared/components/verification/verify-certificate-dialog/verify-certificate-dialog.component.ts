import { CertificateService } from './../../../../modules/issuer/certificates/certificate.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import {
  certificateModel,
  CertificateStatus
} from 'src/app/modules/issuer/certificates/certificate.model';

import * as $ from 'jquery';

@Component({
  selector: 'app-verify-certificate-dialog',
  templateUrl: './verify-certificate-dialog.component.html',
  styleUrls: ['./verify-certificate-dialog.component.scss']
})
export class VerifyCertificateDialogComponent implements OnInit {
  constructor(private certificateService: CertificateService) {
    // super();
  }

  MongoCertificate!: certificateModel;

  @Input() set _data(data: certificateModel) {
    this.MongoCertificate = data;
  }
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter(false);

  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;

  isStep1Visivle: boolean = false;
  isStep2Visivle: boolean = false;
  isStep3Visivle: boolean = false;
  isStep4Visivle: boolean = false;

  viewProgress: boolean = false;

  ngOnInit(): void {}

  ValidateCertificates(selectedBtn) {
    if (selectedBtn === 'public') {
      console.log('pub');
    } else if (selectedBtn === 'private') {
      this.viewProgress = true;
      this.validatePrivateCertificates();
    }
  }

  public validatePrivateCertificates() {
    return this.certificateService
      .getCertificateFromHyperledger(this.MongoCertificate.id!)
      .subscribe((HyperledgerCertificate) => {
        if (HyperledgerCertificate['data'] !== undefined)
          this.startPrivateProgressBar(HyperledgerCertificate['data']);
      });
  }

  private startPrivateProgressBar(HyperledgerCertificate) {
    $('#one').removeClass().addClass('step step--incomplete step--active');
    $('#two').removeClass().addClass('step step--incomplete step--inactive');
    $('#three').removeClass().addClass('step step--incomplete step--inactive');
    $('#four').removeClass().addClass('step step--incomplete step--inactive');

    this.isStep1Visivle = false;
    this.isStep2Visivle = false;
    this.isStep3Visivle = false;
    this.isStep4Visivle = false;

    $('.steps').on('click', '.step--active', function (this) {
      $(this).removeClass('step--incomplete').addClass('step--complete');
      $(this).removeClass('step--active').addClass('step--inactive');
      $(this).next().removeClass('step--inactive').addClass('step--active');
    });

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // console.log('Step 1: blockchain hash comparison');
        this.isStep1Visivle = true;
        $('#one').trigger('click');

        if (
          this.MongoCertificate.transaction?.privateNetwork?.block ===
            parseInt(HyperledgerCertificate.blockNumber) &&
          this.MongoCertificate.transaction?.privateNetwork?.txHash ===
            HyperledgerCertificate.transactionId &&
          new Date(
            this.MongoCertificate.transaction!.privateNetwork!.timestamp.toString()
          ).getTime() === new Date(HyperledgerCertificate.timestamp).getTime()
        )
          this.step1 = true;
        resolve();
      }, 2000);
    })
      .then(() => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            this.isStep2Visivle = true;

            $('#two').trigger('click');
            let expiryDateField = HyperledgerCertificate.fields.certificate.filter(
              (field) => field.name === 'ExpiryDate'
            );
            if (expiryDateField) {
              new Date().getTime() >= new Date(expiryDateField.value).getTime()
                ? (this.step2 = false)
                : (this.step2 = true);
            } else {
              this.step2 = true;
            }

            // this.MongoCertificate.state.status === CertificateStatus.EXPIRED
            //   ? (this.step2 = false)
            //   : (this.step2 = true);
            resolve();
          }, 2000);
        });
      })
      .then(() => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            this.isStep3Visivle = true;
            $('#three').trigger('click');
            this.MongoCertificate.state.status === CertificateStatus.REVOKED
              ? (this.step3 = false)
              : (this.step3 = true);
            resolve();
          }, 2000);
        });
      })
      .then(() => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            this.isStep4Visivle = true;
            // console.log('Step 4: Authenticity Verification');
            $('#four').trigger('click');
            this.step4 = true;
            // this.viewProgress = false
            resolve();
          }, 2000);
        });
      });
  }
}
