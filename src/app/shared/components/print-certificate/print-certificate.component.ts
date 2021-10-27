import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-print-certificate',
  templateUrl: './print-certificate.component.html',
  styleUrls: ['./print-certificate.component.scss']
})
export class PrintCertificateComponent {
  @Input() Certificate!: any;

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  Reecto;
  Verso;

  PRINT(cert) {
    this.buttonClick.emit(cert);
  }

}
