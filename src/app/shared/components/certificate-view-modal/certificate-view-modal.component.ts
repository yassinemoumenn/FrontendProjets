import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { certificateModel } from './../../../modules/issuer/certificates/certificate.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldType } from 'src/app/models/Field';

@Component({
  selector: 'app-certificate-view-modal',
  templateUrl: './certificate-view-modal.component.html',
  styleUrls: ['./certificate-view-modal.component.scss']
})
export class CertificateViewModalComponent extends DumbComponent {
  constructor() {
    super();
  }

  @Input() set _data(data: certificateModel) {
    this.loadcertificatedata(data);
  }
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter(false);

  recipientdata: any = {}
  certificatedata: any = {};
  signerdata!: any;
  issuerdata!: any;
  Recto: boolean = true;
  hasVerso!: boolean;
  page1!: string;
  page2!: string;
  side: string = 'Recto';

  RectoVErso() {
    this.Recto = !this.Recto;
    if (this.Recto) {
      this.side = 'Recto';
    } else {
      this.side = 'Verso';
    }
  }

  loadcertificatedata(certificate: certificateModel) {
    //recipientdata
    this.recipientdata = { ...certificate.recipient };
    certificate.category.fields?.recipient.forEach(element => {
      if (element.type === FieldType.file) {
        if (element.value === null || element.value === "") {
          this.recipientdata[element.name] = "image not found";
        } else {
          this.recipientdata[element.name] = "<img src='" + element.value + "' width=\"10%\" height=\"10%\"/>"
        }
      } else {
        this.recipientdata[element.name] = element.value;
      }

    });
    // eslint-disable-next-line no-unused-expressions
    this.recipientdata.picture ? this.recipientdata["picture"] = "<img src='" + this.recipientdata["picture"] + "' width=\"10%\" height=\"10%\"/>" : this.recipientdata["picture"] = "picture not found";
    //issuer datae
    this.issuerdata = certificate.issuer;
    //certificate data
    certificate.category.fields?.certificate?.forEach(element => {
      if (element.type === FieldType.file) {
        if (element.value === null || element.value === "") {
          this.certificatedata[element.name] = "image not found";
        } else {
          this.certificatedata[element.name] = "<img src='" + element.value + "' width=\"10%\" height=\"10%\"/>"
        }
      } else {
        this.certificatedata[element.name] = element.value;
      }
    });
    // eslint-disable-next-line no-unused-expressions
    certificate.qrcode ? this.certificatedata["QrCode"] = "<img src='" + certificate.qrcode + "' width=\"90\" height=\"90\" />" : this.certificatedata["QrCode"] = "Qrcode not found";
    //signer data
    this.signerdata = certificate.signers;
    //load design body
    // recto side
    this.page1 = certificate.design.recto.html;
    //verso side
    this.hasVerso = certificate.design.verso.html ? true : false;
    this.page2 = this.hasVerso === true ? certificate.design.verso.html : '';

    //matches @ % # $ 

    let matches1 = this.variablesList(this.page1);
    let matches2 = this.hasVerso ? this.variablesList(this.page2) : '';
    // set certificate values recto
    this.page1 = this.replacement(matches1, this.page1, this.certificatedata, this.recipientdata, this.issuerdata) + certificate.design.recto.css;
    // set certificate values verso
    if (this.page2 !== '') {
      this.page2 = this.replacement(matches2, this.page2, this.certificatedata, this.recipientdata, this.issuerdata) + certificate.design.verso.css;
    }
  }

  private replacement(matches, line: string, dataCert, dataRec, dataissuer) {
    let l: string = line;
    if (matches.Atmatches !== null) {

      matches.Atmatches.forEach(element => {
        let helper = element.substring(1);
        l = l.replace(element, dataRec[helper.toLowerCase()]);
      });
    }
    if (matches.Hashmatches !== null) {

      matches.Hashmatches.forEach(element => {
        let helper = element.substring(1);
        l = l.replace(element, dataCert[helper.toLowerCase()]);
      });
    }

    if (matches.pourCentMatches !== null) {
      matches.pourCentMatches.forEach(element => {

        let helper = element.substring(1);
        l = l.replace(element, dataissuer[helper.toLowerCase()]);
      });
    }
    return l;
  }

  private variablesList(body) {
    let Atpattern = /@\w+/g;
    let Hashpattern = /#\w+/g;
    let Dollarpattern = /\$(?:\w+-)+\w+/g;
    let pourCentPattern = /\%\w+/g;
    let Atmatches = body.match(Atpattern);
    let Hashmatches = body.match(Hashpattern);
    let Dollarmatches = body.match(Dollarpattern);
    let pourCentMatches = body.match(pourCentPattern);
    return {
      Atmatches,
      Hashmatches,
      Dollarmatches,
      pourCentMatches
    }
  }


  close(e) {
    if (e) {
      this.closeModal.emit(true);
    }
  }
}
