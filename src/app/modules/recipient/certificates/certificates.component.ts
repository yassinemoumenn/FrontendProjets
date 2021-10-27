import { VerifierModel } from './../../verifier/Verifier.model';
import {
  certificateModel,
  CertificateStatus
} from './../../issuer/certificates/certificate.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, first, map, startWith, switchMap } from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Page } from 'src/app/models/Page';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { ViewCertificatesService } from 'src/app/modules/recipient/certificates/certificates.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../auth/authentication.service';
import { OptionItem } from '../../issuer/category/category.component';

@Component({
  selector: 'app-view-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent extends SmartComponent implements OnInit {
  certificates: any[] = [];
  @ViewChild(PaginationComponent)
  paginatorGrandParent?: PaginationComponent;
  constructor(
    private service: ViewCertificatesService,
    public dialog: MatDialog,
    private auth: AuthenticationService
  ) {
    super();
  }
  currentUser;
  ngOnInit(): void {
    this.service
      .getAllRecipientsCertificates(this.pageIndex, this.pageSize)
      .subscribe((result) => {
        this.displayedRows$ = result.data['content'];
        this.length = result.data['totalElements'];
      });

    this.service.getAllVerifiers().subscribe((result) => {
      this.Verifiers = result.data['content'];
      this.optionItems = this.Verifiers.map((item) => {
        return {
          id: item.id,
          firstname: item.firstname,
          lastname: item.lastname,
          picture: item.picture === null ? '' : item.picture,
          show: true
        };
      });
    });
  }
  sb = this.auth.currentUserSubject
    .asObservable()
    .pipe(first((user) => !!user))
    .subscribe((user) => {
      this.currentUser = Object.assign({}, user);
    });

  nbrElementinPage = 5;
  pageIndex: number = 0;
  pageSize: number = 5;
  length!: number;
  rows$!: Observable<certificateModel[]>;
  isLoading: boolean = false;
  displayedRows$!: any[];

  status: any[] = [
    'All',
    CertificateStatus.REJECTED,
    CertificateStatus.CREATED,
    CertificateStatus.EXPIRED,
    CertificateStatus.SIGNED,
    CertificateStatus.ISSUED
  ];
  optionItems!: Array<OptionItem>;
  Verifiers!: VerifierModel[];

  NoData: boolean = false;
  ApplySearch(search) {
    if (search === undefined) {
      this.service
        .getAllRecipientsCertificates(this.pageIndex, this.pageSize)
        .subscribe((result) => {
          this.displayedRows$ = result.data['content'];
          this.length = result.data['totalElements'];
        });
    } else {
      let resFiltred = this.displayedRows$.filter(
        (x) =>
          x.state.status.trim().toLowerCase() === search.trim().toLowerCase() ||
          x.category.name.trim().toLowerCase() ===
            search.trim().toLowerCase() ||
          x.recipient.firstname.trim().toLowerCase() ===
            search.trim().toLowerCase() ||
          x.recipient.lastname.trim().toLowerCase() ===
            search.trim().toLowerCase()
      );
      this.displayedRows$ = resFiltred;
    }
    if (this.displayedRows$.length === 0) {
      this.NoData = true;
    } else {
      this.NoData = false;
    }
  }

  optionSelected(filter: any): any {
    if (filter === 'All') {
      this.service
        .getAllRecipientsCertificates(this.pageIndex, this.pageSize)
        .subscribe((result) => {
          this.displayedRows$ = result.data['content'];
          this.length = result.data['totalElements'];
        });
    } else {
      this.displayedRows$ = this.displayedRows$.filter(
        (x) =>
          x.state.status.trim().toLowerCase() === filter.trim().toLowerCase()
      );
    }
  }
}
