import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { certificateModel } from 'src/app/modules/issuer/certificates/certificate.model';

@Component({
  selector: 'app-view-verification',
  templateUrl: './view-verification.component.html',
  styleUrls: ['./view-verification.component.scss']
})
export class ViewVerificationComponent extends DumbComponent {
  @Input() certificates$!: Observable<certificateModel>;
  @Input() dialog!: MatDialog;
  @Input() certificateID!: string;
  @Output() closeClicked = new EventEmitter();

  constructor() {
    super();
  }
  viewClicked(viewContent) {
    this.dialog.open(viewContent, {
      width: '70%',
      height: '97%'
    });
  }
  downloadClicked(downloadContent) {
    this.dialog.open(downloadContent, {
      width: '70%',
      height: '97%'
    });
  }
  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };
  verify(verifyCertificate) {
    this.dialog.open(verifyCertificate, {
      width: '950px',
      height: '400px'
    });
  }
}
