import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CertificateStatus,
  ICertificateState
} from '../../issuer/certificates/certificate.model';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  constructor(
    private readonly _RecipientOrganizationService: CertificateService
  ) { }
  displayedRows$!: any[];
  EmptyListClickEvent({ }: { Event: FormGroup }) { }
  EmptyList: boolean = false;

  nbrElementinPage = 5;
  pageIndex: number = 0;
  pageSize: number = 5;
  length!: number;
  certStat: ICertificateState = {
    createdAt: new Date(),
    expiredAt: new Date(),
    issuedAt: new Date(),
    signedAt: new Date(),
    revokedAt: new Date(),
    status: CertificateStatus.CREATED
  };

  paginationCategory({ pageEvent }: { pageEvent: any }) {
    this.pageIndex = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;

    this._RecipientOrganizationService
      .getAllCertificates(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.displayedRows$ = result.data['content'];
        this.length = result.data['totalElements'];
      });
  }
  ngOnInit(): void {

    this._RecipientOrganizationService
      .getAllCertificates(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.displayedRows$ = result.data['content'];
        this.length = result.data['totalElements'];
      });
  }
}
